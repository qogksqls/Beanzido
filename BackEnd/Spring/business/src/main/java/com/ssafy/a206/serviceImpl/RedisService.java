package com.ssafy.a206.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a206.dto.MessageDTO;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisTemplateChat;
//	private final RedisTemplate<String, String> redisTemplateSession;

	public void setChatValues(MessageDTO dto, String sessionId) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		String nano = sessionId+":"+String.valueOf(System.currentTimeMillis());
		
		ObjectMapper mapper = new ObjectMapper();
		String data=null;
		try {
			data = mapper.writeValueAsString(dto);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		values.set(nano, data, 1, TimeUnit.DAYS);
	}

	public void setChatValues(String key, String data, Duration duration) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		values.set(key, data, duration);
	}

	public String getChatValues(String key) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		return values.get(key);
	}
	
	public List<MessageDTO> getChatAll() {
		Set<String> keys = redisTemplateChat.keys("*");
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		List<MessageDTO> list = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		for(String s : keys) {
			try {
				list.add(mapper.readValue(values.get(s), MessageDTO.class));
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return list;
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
