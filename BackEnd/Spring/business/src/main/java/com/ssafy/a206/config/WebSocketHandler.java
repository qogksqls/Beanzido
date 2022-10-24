package com.ssafy.a206.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.PongMessage;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
	private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("웹소켓 연결 ID : {}", session.getId());
		String sessionId = session.getId();
		sessions.put(sessionId, session);
		System.out.println(session.getRemoteAddress());
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
		log.info("데이터 통신 ID : {}", session.getId());
		log.info("데이터 통신 내용 : {}", message);
		
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
		log.info("데이터 통신 ID : {}", session.getId());
		log.info("데이터 통신 내용 : {}", message);
		
		sessions.values().forEach(s -> {

			try {
				s.sendMessage(message);
			} catch (Exception e) {
				// TODO: handle exception
			}
		});
		
//		super.handleTextMessage(session, message);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		log.info("웹소켓 연결 종료 ID : {}", session.getId());
		super.afterConnectionClosed(session, status);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		log.info("데이터 통신 에러 ID : {}", session.getId());
		super.handleTransportError(session, exception);
	}
}
