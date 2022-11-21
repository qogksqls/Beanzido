package com.ssafy.a206.config;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.ssafy.a206.filter.BadWordFilter;

@Configuration
public class BadWordFilterConfig {
	@Value("${BADWORD_PATH}")
	private String path;
	
	@Bean
	public BadWordFilter badWordFilter() throws FileNotFoundException, IOException, ParseException {
		return new BadWordFilter(path);
	}
}
