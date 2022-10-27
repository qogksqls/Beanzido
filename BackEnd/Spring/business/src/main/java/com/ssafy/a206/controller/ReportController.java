package com.ssafy.a206.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.a206.request.ReportReq;

@RestController
@RequestMapping("report")
public class ReportController {
	@PostMapping
	public String reportPost(@RequestBody ReportReq reportReq) {
		
		return "sucess";
	}
	@GetMapping
	public int reportCnt() {
		return 1;
	}
}
