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

import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.DetectModerationLabelsRequest;
import software.amazon.awssdk.services.rekognition.model.DetectModerationLabelsResponse;
import software.amazon.awssdk.services.rekognition.model.Image;
import software.amazon.awssdk.services.rekognition.model.ModerationLabel;
import software.amazon.awssdk.services.rekognition.model.RekognitionException;
import software.amazon.awssdk.utils.BinaryUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.websocket.OnOpen;

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

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String sessionId = session.getId();
		sessions.put(sessionId, session);
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
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (JsonProcessingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}


//		String ip = session.getHandshakeHeaders().get("x-forwarded-for").get(0);
		String ip = "";

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
		TextMessage newMessage = new TextMessage(d);
		sessions.values().forEach(s -> {
			try {
				s.sendMessage(newMessage);
			} catch (Exception e) {
				// TODO: handle exception
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
