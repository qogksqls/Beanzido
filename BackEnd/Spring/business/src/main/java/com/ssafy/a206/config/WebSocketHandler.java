package com.ssafy.a206.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a206.dto.MessageDTO;
import com.ssafy.a206.filter.BadWordFilter;
import com.ssafy.a206.filter.ImageFilter;
import com.ssafy.a206.request.MessageReq;
import com.ssafy.a206.service.MessageLogService;
import com.ssafy.a206.serviceImpl.RedisService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

	@Autowired
	private ImageFilter imageFilter;
	
	@Autowired
	private BadWordFilter badWordFilter;
	
	@Autowired
	private MessageLogService messageLogService;

	@Autowired
	private RedisService redisService;
	
	@Autowired
    RabbitTemplate rabbitTemplate;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String sessionId = session.getId();
		sessions.put(sessionId, session);
		log.info("seesion_count : {}",sessions.size());
		sessions.values().forEach(s -> {

			try {
				String cnt = String.valueOf(sessions.size());
				s.sendMessage(new TextMessage(cnt.getBytes()));
			} catch (Exception e) {
			}
		});

		super.afterConnectionEstablished(session);
	}

	@Override
	protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
		sessions.values().forEach(s -> {

			try {
				s.sendMessage(message);
			} catch (Exception e) {
			}
		});

	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		MessageReq messageReq = null;
		try {
			messageReq = mapper.readValue(message.getPayload(), MessageReq.class);
		} catch (JsonMappingException e1) {
			e1.printStackTrace();
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}


		String ip = session.getHandshakeHeaders().get("x-forwarded-for").get(0);

		messageLogService.messageAdd(messageReq, ip);
		MessageDTO dto = new MessageDTO(messageReq, ip);
		dto.setContentFilter(badWordFilter.search(dto.getContent()));
		if (messageReq.getImg() != null) {
			String imgFilter = imageFilter.detectModLabels(messageReq.getImg());
			dto.setImgFilter(imgFilter);
			dto.setCreatedAt(new Date());
		}
		redisService.setChatValues(dto, session.getId());

		String d = mapper.writeValueAsString(dto);
		
		rabbitTemplate.convertAndSend("dev-beanzido.exchange","dev-beanzido.oing.#",d);
		
	}

	@RabbitListener(bindings = @QueueBinding(value=@Queue, 
			exchange = @Exchange(name = "${EXHANGE_NAME}", type = ExchangeTypes.FANOUT)))
    public void receiveMessage(final Message message) {
		TextMessage newMessage = new TextMessage(new String(message.getBody(),StandardCharsets.UTF_8));
		sessions.values().forEach(s -> {
			try {
				s.sendMessage(newMessage);
			} catch (Exception e) {
			}
		});
    }
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session.getId());
		super.afterConnectionClosed(session, status);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		super.handleTransportError(session, exception);
	}

	
}
