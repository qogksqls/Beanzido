package com.ssafy.a206.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
	
	@Value("${REDIS_PORT_CHAT}")
	private int redisPortChat;
	
	@Value("${REDIS_HOST}")
	private String redisHost;
	
	@Value("${REDIS_PASSWORD}")
	private String redisPassword;

	
	@Bean(name= "redisChatConnectionFactory")
	public RedisConnectionFactory redisChatConnectionFactory() {
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
		redisStandaloneConfiguration.setHostName(redisHost);
		redisStandaloneConfiguration.setPort(redisPortChat);
        redisStandaloneConfiguration.setPassword(redisPassword); //redis에 비밀번호가 설정 되어 있는 경우 설정해주면 됩니다.
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisStandaloneConfiguration);
        return lettuceConnectionFactory;
	}
	
	@Primary
	@Bean(name = "redisTemplate")
	public RedisTemplate<String, String> redisTemplateChat(){
		RedisTemplate<String, String> redisTemplate = new RedisTemplate<>();
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new StringRedisSerializer());
		redisTemplate.setConnectionFactory(redisChatConnectionFactory());
		
		return redisTemplate;
	}
	
	
}
