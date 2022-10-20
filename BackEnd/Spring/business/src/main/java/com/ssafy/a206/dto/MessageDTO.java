package com.ssafy.a206.dto;


import lombok.Data;

@Data
public class MessageDTO {
	public enum MessageType{
		TALK, QUIT
	}

	private MessageType type;
	private String content;
	private String location;
	private float latitude;
	private float longitude;
	private int peopleCnt;

}

