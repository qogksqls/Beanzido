package com.ssafy.a206.dto;


import com.ssafy.a206.request.MessageReq;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;

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
	private Timestamp createdAt;

	public MessageDTO(MessageReq mes, String ip) {
		super();
		this.content = mes.getContent();
		this.img = mes.getImg();
		this.latitude = mes.getLatitude();
		this.longitude = mes.getLongitude();
		this.color = mes.getColor();
		this.nickName = mes.getNickname();
		this.location = mes.getLocation();
		this.createdAt = new Timestamp(new Date().getTime());
		this.ip = ip;
	}
	
	
}

