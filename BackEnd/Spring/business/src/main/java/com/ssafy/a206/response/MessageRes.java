package com.ssafy.a206.response;

import lombok.Data;

@Data
public class MessageRes {
	private String content;
	private String img;
	private String location;
	private float latitude;
	private float longitude;
	private int color;
	private String nickName;
	private String ip;
}
