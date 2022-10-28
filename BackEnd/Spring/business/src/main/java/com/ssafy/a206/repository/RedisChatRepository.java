package com.ssafy.a206.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.a206.dto.MessageDTO;

public interface RedisChatRepository extends CrudRepository<MessageDTO, Integer>{
	List<MessageDTO> findAll();
}
