package com.ssafy.a206.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.ssafy.a206.dto.MessageDTO;

@Configuration
public class RedisConfig2 {

	@Value("${REDIS_HOST}")
	private String redisHost;

	@Value("${REDIS_PASSWORD}")
	private String redisPassword;

	@Value("${REDIS_PORT_CHAT2}")
	private int redisPortChat2;
	
	@Bean(name = "redisChatConnectionFactory2")
	public RedisConnectionFactory redisChatConnectionFactory2() {
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
		redisStandaloneConfiguration.setHostName(redisHost);
		redisStandaloneConfiguration.setPort(redisPortChat2);
		redisStandaloneConfiguration.setPassword(redisPassword); // redis에 비밀번호가 설정 되어 있는 경우 설정해주면 됩니다.
		LettuceConnectionFactory lettuceConnectionFactory2 = new LettuceConnectionFactory(redisStandaloneConfiguration);
		return lettuceConnectionFactory2;
	}

	@Bean(name = "redisTemplateChat2")
	public RedisTemplate<String, String> redisTemplateChat2() {
		RedisTemplate<String, String> redisTemplate2 = new RedisTemplate<>();
		redisTemplate2.setKeySerializer(new StringRedisSerializer());
		redisTemplate2.setValueSerializer(new StringRedisSerializer());
		redisTemplate2.setConnectionFactory(redisChatConnectionFactory2());

		return redisTemplate2;
	}

}
