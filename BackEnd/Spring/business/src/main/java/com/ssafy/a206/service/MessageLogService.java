package com.ssafy.a206.service;

import com.ssafy.a206.request.MessageReq;

public interface MessageLogService {
	public void messageAdd(MessageReq messageReq, String ip);
}
