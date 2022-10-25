package com.ssafy.a206.request;

import com.ssafy.a206.entity.Report;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportReq {
	private String reporter;
	private String reportee;
	
	public Report createReport() {
		return new Report(this.reporter,this.reportee);
	}
}
