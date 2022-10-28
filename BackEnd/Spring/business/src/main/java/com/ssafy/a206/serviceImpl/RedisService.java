package com.ssafy.a206.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisTemplateChat;
//	private final RedisTemplate<String, String> redisTemplateSession;

	public void setChatValues(String key, String data) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		values.set(key, data);
	}

	public void setChatValues(String key, String data, Duration duration) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		values.set(key, data, duration);
	}

	public String getChatValues(String key) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		return values.get(key);
	}

	public void deleteChatValues(String key) {
		redisTemplateChat.delete(key);
	}
	
//	public void setSessionValues(String key, WebSocketSession data) {
//		ValueOperations<String, WebSocketSession> values = redisTemplateSession.opsForValue();
//		values.set(key, data);
//	}
//
//	public void setSessionValues(String key, WebSocketSession data, Duration duration) {
//		ValueOperations<String, WebSocketSession> values = redisTemplateSession.opsForValue();
//		values.set(key, data, duration);
//	}
//
//	public Object getSessionValues(String key) {
//		ValueOperations<String, WebSocketSession> values = redisTemplateSession.opsForValue();
//		return values.get(key);
//	}
//
//	public void deleteSessionValues(String key) {
//		redisTemplateSession.delete(key);
//	}
}
