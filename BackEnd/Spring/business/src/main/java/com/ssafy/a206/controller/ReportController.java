package com.ssafy.a206.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a206.request.ReportReq;
import com.ssafy.a206.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("report")
@RequiredArgsConstructor
public class ReportController {
	private final ReportService reportService;
	
	@PostMapping
	public String reportPost(@RequestBody ReportReq reportReq) {
		reportService.reportAdd(reportReq);
		return "sucess";
	}
	
	@GetMapping("/{ip}")
	public int reportCnt(@PathVariable("ip") String ip) {
		return reportService.reportCntByIp(ip);
	}
}
