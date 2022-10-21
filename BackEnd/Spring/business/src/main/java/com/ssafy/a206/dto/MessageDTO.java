package com.ssafy.a206.dto;


import lombok.Data;

@Data
public class MessageDTO {
	private String content;
	private String img;
	private String location;
	private float latitude;
	private float longitude;
	private int peopleCnt;

}

