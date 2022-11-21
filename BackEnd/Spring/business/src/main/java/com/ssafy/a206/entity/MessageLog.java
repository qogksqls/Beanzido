package com.ssafy.a206.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "messageLog")
public class MessageLog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(name = "ip")
	private String ip;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "img")
	private String img;
	
	@Column(name = "created_at")
	private Timestamp created_at;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "latitude")
	private float latitude;
	
	@Column(name = "longitude")
	private float longitude;
	
	@Column(name ="color")
	private int color;
	
	@Column(name ="nickname")
	private String nickname;
	
	public MessageLog(String ip, String content, String img, Timestamp created_at, String location, float latitude,
			float longitude, int color, String nickname) {
		super();
		this.ip = ip;
		this.content = content;
		this.img = img;
		this.created_at = created_at;
		this.location = location;
		this.latitude = latitude;
		this.longitude = longitude;
		this.color = color;
		this.nickname =nickname;
	}
	
	
}
