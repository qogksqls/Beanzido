package com.ssafy.a206.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a206.dto.MessageDTO;
import com.ssafy.a206.request.MessageReq;
import com.ssafy.a206.service.MessageLogService;
import com.ssafy.a206.serviceImpl.RedisService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	@Autowired
	private MessageLogService messageLogService;
	
	@Autowired
	private RedisService redisService;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("<OPEN>세션 ID : {}", session.getId());
		log.info("session count : {}",sessions.size());
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
		
		String ip =session.getRemoteAddress().getHostString();
		
		log.info("session = {}",session.getHandshakeHeaders());
		
		messageLogService.messageAdd(messageReq, ip);
		MessageDTO dto = new MessageDTO(messageReq, ip);
		
		redisService.setChatValues(dto,session.getId());
		
		String d = mapper.writeValueAsString(dto);
		TextMessage newMessage = new TextMessage(d);
		log.info("메시지 : {}", newMessage.getPayload());
		sessions.values().forEach(s -> {


			try {
				s.sendMessage(newMessage);
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
		log.info("<CLOSE>세션 ID : {}", session.getId());
		sessions.remove(session.getId());
		log.info("session count : {}",sessions.size());
		super.afterConnectionClosed(session, status);
	}


	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		log.info("세션 ID : {}", session.getId());
		super.handleTransportError(session, exception);
	}
}
