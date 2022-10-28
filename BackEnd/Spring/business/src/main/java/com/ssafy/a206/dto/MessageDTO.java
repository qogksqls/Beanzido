package com.ssafy.a206.dto;


import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;

import com.ssafy.a206.request.MessageReq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RedisHash("message")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {
	@Id
	private String id;
	private String content;
	private String img;
	private float latitude;
	private float longitude;
	private int color;
	private String nickName;
	private String location;
	private String ip;

	public MessageDTO(MessageReq mes, String ip) {
		super();
		this.content = mes.getContent();
		this.img = mes.getImg();
		this.latitude = mes.getLatitude();
		this.longitude = mes.getLongitude();
		this.color = mes.getColor();
		this.nickName = mes.getNickname();
		this.location = mes.getLocation();
		this.ip = ip;
	}
	
	
}

