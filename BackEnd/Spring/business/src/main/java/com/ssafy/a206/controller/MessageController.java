package com.ssafy.a206.controller;

import javax.servlet.annotation.MultipartConfig;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.a206.dto.MessageDTO;

@RestController
@RequestMapping("chat")
public class MessageController {
	
	@PostMapping("/send")
	public String send(@RequestPart("file") MultipartFile file, MessageDTO dto) {
		
		return null;
	}
	
}
