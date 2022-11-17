package com.ssafy.a206.filter;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class BadWordFilter {
	private List<String> keywords;

	public BadWordFilter(String path) throws FileNotFoundException, IOException, ParseException {
		super();
		Object ob = new JSONParser().parse(new FileReader(path));
		JSONObject js = (JSONObject) ob;
		keywords = (List<String>) js.get("badwords");
	}

	public boolean search(String text) {
		for (String keyword : keywords) {

			Map<Character, Integer> skipTable = createSkipTable(keyword);

			int textIdx = keyword.length() - 1;
			while (textIdx <= text.length() - 1) {
				int keywordIdx = keyword.length() - 1;
				while (keywordIdx >= 0 && keyword.charAt(keywordIdx) == text.charAt(textIdx)) {
					keywordIdx--;
					textIdx--;
				}

				if (keywordIdx < 0) { // match!
					return true;
				} else {
					textIdx += skipTable.getOrDefault(text.charAt(textIdx), keyword.length());
				}
			}
		}

		return false;
	}

	private Map<Character, Integer> createSkipTable(String keyword) {
		Map<Character, Integer> skipTable = new HashMap<>();
		int count = keyword.length() - 1;
		for (char ch : keyword.toCharArray()) {
			skipTable.put(ch, count--);
		}
		return skipTable;
	}

}
