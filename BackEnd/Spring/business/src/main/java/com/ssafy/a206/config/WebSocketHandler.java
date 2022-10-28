package com.ssafy.a206.config;

import java.net.InetSocketAddress;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.PongMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a206.dto.MessageDTO;
import com.ssafy.a206.repository.RedisChatRepository;
import com.ssafy.a206.request.MessageReq;
import com.ssafy.a206.response.MessageRes;
import com.ssafy.a206.service.MessageLogService;
import com.ssafy.a206.serviceImpl.RedisService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	@Autowired
	private MessageLogService messageLogService;
	
	@Autowired
	private RedisService redisService;
	
	@Autowired
	private RedisChatRepository redisChatRep;
	
	
	static int s;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("세션 ID : {}", session.getId());
		String sessionId = session.getId();
		sessions.put(sessionId, session);
		
		
		
		sessions.values().forEach(s -> {

			try {
				String cnt = String.valueOf(sessions.size());
				s.sendMessage(new TextMessage(cnt.getBytes()));
			} catch (Exception e) {
				// TODO: handle exception
			}
		});

		super.afterConnectionEstablished(session);
	}

	
	@Override
	protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
		log.info("세션 ID : {}", session.getId());
//		log.info("메시지 : {}", message.getPayload().);
		
		sessions.values().forEach(s -> {

			try {
				s.sendMessage(message);
			} catch (Exception e) {
				// TODO: handle exception
			}
		});
		
	}
	
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		log.info("세션 ID : {}", session.getId());
		log.info("메시지 : {}", message.getPayload());
		
		
		
		ObjectMapper mapper = new ObjectMapper();
		MessageReq messageReq=null;
		try {
			messageReq = mapper.readValue(message.getPayload(), MessageReq.class);
		} catch (JsonMappingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (JsonProcessingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		messageLogService.messageAdd(messageReq, session.getRemoteAddress().getHostString());
		MessageDTO dto = new MessageDTO(messageReq, session.getRemoteAddress().getHostString());
		
		redisChatRep.save(dto);
		
		sessions.values().forEach(s -> {

			try {
				s.sendMessage(message);
			} catch (Exception e) {
				// TODO: handle exception
			}
		});
//		List<MessageDTO> list = redisChatRep.findAll();
//		for(MessageDTO dss : list) {
//			System.out.println(dss);
//		}
//		super.handleTextMessage(session, message);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		log.info("세션 ID : {}", session.getId());
		super.afterConnectionClosed(session, status);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		log.info("세션 ID : {}", session.getId());
		super.handleTransportError(session, exception);
	}
}
