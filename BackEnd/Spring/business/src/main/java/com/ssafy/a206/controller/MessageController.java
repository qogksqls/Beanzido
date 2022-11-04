package com.ssafy.a206.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a206.dto.MessageDTO;
import com.ssafy.a206.serviceImpl.RedisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("chat")
@RequiredArgsConstructor
public class MessageController {
	private final RedisService redisService;
	@GetMapping("/send")
	public List<MessageDTO> send() {
		List<MessageDTO> list = redisService.getChatAll();
		Collections.sort(list);
		return list;
	}
	
}
