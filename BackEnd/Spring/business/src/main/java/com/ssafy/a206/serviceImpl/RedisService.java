package com.ssafy.a206.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.a206.dto.MessageDTO;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
	@Autowired
	private  RedisTemplate<String, String> redisTemplateChat;
	
	@Autowired
	@Qualifier("redisTemplateChatTwo")
	private  RedisTemplate<String, String> redisTemplateChatTwo;

	public void setChatValues(MessageDTO dto, String sessionId) {
		ValueOperations<String, String> values = redisTemplateChat.opsForValue();
		ListOperations<String, String> values2 = redisTemplateChatTwo.opsForList();
		String nano = sessionId+":"+String.valueOf(System.currentTimeMillis());
		
		ObjectMapper mapper = new ObjectMapper();
		String data=null;
		try {
			data = mapper.writeValueAsString(dto);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(values2.size("message")>200) {
			values2.leftPop("message");
		}
		values.set(nano, data, 1, TimeUnit.DAYS);
		values2.rightPush("message", data);
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
		ListOperations<String, String> values2 = redisTemplateChatTwo.opsForList();
		List<String> keys = values2.range("message", 0, -1);
		List<MessageDTO> list = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		for(String s : keys) {
			try {
				list.add(mapper.readValue(s, MessageDTO.class));
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
