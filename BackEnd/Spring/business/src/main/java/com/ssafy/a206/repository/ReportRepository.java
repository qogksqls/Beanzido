package com.ssafy.a206.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.a206.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {

}
