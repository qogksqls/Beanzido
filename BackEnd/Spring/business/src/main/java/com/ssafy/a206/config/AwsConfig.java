package com.ssafy.a206.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;

@Component
public class AwsConfig {
	
	@Value("${AWS_ID}")
	private String awsId;

	@Value("${AWS_PASSWORD}")
	private String awsPassword;
	
	@Bean
	public RekognitionClient rekClient() {
		AwsBasicCredentials awsCreds = AwsBasicCredentials.create(
				  awsId,
				  awsPassword);
		
      Region region = Region.US_EAST_1;
      RekognitionClient rekClient = RekognitionClient.builder()
          .region(region)
          .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
          .build();
      
      return rekClient;
	}
}
