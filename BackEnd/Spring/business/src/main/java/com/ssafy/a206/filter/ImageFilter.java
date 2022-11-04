package com.ssafy.a206.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.DetectModerationLabelsRequest;
import software.amazon.awssdk.services.rekognition.model.DetectModerationLabelsResponse;
import software.amazon.awssdk.services.rekognition.model.Image;
import software.amazon.awssdk.services.rekognition.model.ModerationLabel;
import software.amazon.awssdk.services.rekognition.model.RekognitionException;
import software.amazon.awssdk.utils.BinaryUtils;

@Component
@RequiredArgsConstructor
public class ImageFilter {
	@Autowired
	private RekognitionClient rekClient;
	
	public String detectModLabels(String sourceImage) {

		try {
			sourceImage = sourceImage.substring(sourceImage.indexOf(",") + 1);
			SdkBytes sourceBytes = SdkBytes.fromByteArray(BinaryUtils.fromBase64(sourceImage));
			Image souImage = Image.builder().bytes(sourceBytes).build();

			DetectModerationLabelsRequest moderationLabelsRequest = DetectModerationLabelsRequest.builder()
					.image(souImage).minConfidence(70F).build();

			DetectModerationLabelsResponse moderationLabelsResponse = rekClient
					.detectModerationLabels(moderationLabelsRequest);
			List<ModerationLabel> labels = moderationLabelsResponse.moderationLabels();

			for (ModerationLabel label : labels) {
				if(label.parentName().equals("Explicit Nudity")) {
					return "선정적인 이미지가 포함되어 있습니다.";
				}else if(label.parentName().equals("Violence")) {
					return "폭력적인 이미지가 포함되어 있습니다.";
				}else if(label.parentName().equals("Visually Disturbing")) {
					return "혐오스러운 이미지가 포함되어 있습니다.";
				}
			}
		} catch (RekognitionException e) {
			return "";
		}
		return "";
	}
}
