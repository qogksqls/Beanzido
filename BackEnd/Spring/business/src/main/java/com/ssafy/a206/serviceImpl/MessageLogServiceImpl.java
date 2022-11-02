package com.ssafy.a206.serviceImpl;

import org.springframework.stereotype.Service;

import com.ssafy.a206.entity.MessageLog;
import com.ssafy.a206.repository.MessageLogRepository;
import com.ssafy.a206.request.MessageReq;
import com.ssafy.a206.service.MessageLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageLogServiceImpl implements MessageLogService{
	private final MessageLogRepository messageLogRep;
	
	@Override
	public void messageAdd(MessageReq messageReq, String ip) {
		MessageLog messageLog = messageReq.createMessageLog(ip);
		messageLogRep.save(messageLog);
	}
	
}
