package com.ssafy.a206.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.a206.entity.MessageLog;

public interface MessageLogRepository extends JpaRepository<MessageLog, Integer>{

}
