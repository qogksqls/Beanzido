package com.ssafy.a206.request;


import java.sql.Timestamp;
import java.util.Date;

import com.ssafy.a206.entity.MessageLog;

import lombok.Data;

@Data
public class MessageReq {
	private String content;
	private String img;
	private float latitude;
	private float longitude;
	private int color;
	private String nickname;
	private String location;
	
	public MessageLog createMessageLog(String ip) {
		Timestamp timestamp = new Timestamp(new Date().getTime());
		
		return new MessageLog(ip, content, img, timestamp, location, latitude, longitude, color, nickname);
	}
	
}
