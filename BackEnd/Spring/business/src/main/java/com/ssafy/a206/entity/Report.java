package com.ssafy.a206.entity;

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
@Table(name = "report")
public class Report {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int no;
	
	@Column(name = "reporter")
	private String reporter;
	
	@Column(name = "reportee")
	private String reportee;
	
	public Report(String reporter, String reportee) {
		this.reportee = reportee;
		this.reporter = reporter;
	}
}
