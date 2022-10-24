package com.ssafy.a206.request;

import com.ssafy.a206.dto.MessageDTO;

import lombok.Data;

@Data
public class MessageReq {
	private String content;
	private String img;
	private String location;
	private float latitude;
	private float longitude;
	private int color;
	private String nickName;
}
