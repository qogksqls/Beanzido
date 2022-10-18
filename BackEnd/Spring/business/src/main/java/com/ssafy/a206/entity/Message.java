package com.ssafy.a206.entity;

import javax.persistence.Column;
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
@Table(name = "message")
public class Message {
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
	private String created_at;
	
	@Column(name = "location")
	private String location;
	
	@Column(name = "latitude")
	private float latitude;
	
	@Column(name = "longitude")
	private float longitude;
}
