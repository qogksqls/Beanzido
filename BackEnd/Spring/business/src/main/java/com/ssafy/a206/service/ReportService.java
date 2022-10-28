package com.ssafy.a206.service;

import com.ssafy.a206.request.ReportReq;

public interface ReportService {
	public boolean reportAdd(ReportReq reportReq);
	public int reportCntByIp(String ip);
}
