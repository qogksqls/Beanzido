package com.ssafy.a206.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.ssafy.a206.entity.ReportCnt;

public interface ReportCntRepository extends JpaRepository<ReportCnt, Integer>{
	ReportCnt findByIp(@Param("ip") String ip);
}
