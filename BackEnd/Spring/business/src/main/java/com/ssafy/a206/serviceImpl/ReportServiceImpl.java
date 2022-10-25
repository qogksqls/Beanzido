package com.ssafy.a206.serviceImpl;

import org.springframework.stereotype.Service;

import com.ssafy.a206.entity.Report;
import com.ssafy.a206.entity.ReportCnt;
import com.ssafy.a206.repository.ReportCntRepository;
import com.ssafy.a206.repository.ReportRepository;
import com.ssafy.a206.request.ReportReq;
import com.ssafy.a206.service.ReportService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{
	private final ReportRepository reportRep;
	private final ReportCntRepository reportCntRep;
	
	
	@Override
	public boolean reportAdd(ReportReq reportReq) {
		Report report = reportReq.createReport();
		reportRep.saveAndFlush(report);
		ReportCnt reportCnt = reportCntRep.findByIp(report.getReportee());
		reportCnt.cntAdd();
		reportCntRep.saveAndFlush(reportCnt);
		
		return true;
	}
	
	
}
