import konlpy
import redis
import operator
import json
import nltk
from collections import Counter
import re
import os
from dotenv import load_dotenv
import time
from apscheduler.schedulers.background import BackgroundScheduler
import pickle

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR,".env"))

nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')

# 명사추출.
sched = BackgroundScheduler(timezone='Asia/Seoul')
hannanum = konlpy.tag.Hannanum()
tf_keyword_rank = {}
# print(hannanum.pos('아 배고파 점심메뉴 추천좀요'))

# get redis connection
rd_keyword = redis.StrictRedis(host=os.environ["SERVER_IP"], port=os.environ["REDIS_PORT_KEYWORD"], db=0)
rd_message = redis.StrictRedis(host=os.environ["SERVER_IP"], port=os.environ["REDIS_PORT_MESSAGE"], db=0)


# rd_keyword.set('노원구',json.dumps(nowon, ensure_ascii=False).encode('utf-8')


# 키워드 분석 : 1분마다update, 비동기, 백그라운드
# 메세지가 몇 만개 이상일 때 key 조회 속도issue?
class Message:
    def __init__(self, location, content):
        self.location = location
        self.content = content


@sched.scheduled_job('cron',minute='*/5', id='keyword')
def analyze():
    print("분석시작")
    keys = rd_message.keys("*")
    messages = []
    words3 = {}
    tf_words1 = {}
    tf_words2 = {}
    tf_words3 = {}
    tf_total ={}

    # print(1)
    for key in keys:
        messages.append(json.loads(rd_message.get(key).decode()))

    # print(2)
    for message in messages:
        region3 = message['code']
        if words3.setdefault(region3, ' '):
            words3[region3] += " " + message['content']

    # print(words3)
    for region, words in words3.items():
        tf_words3[region] = {}
        if words.strip()=='':
            continue
        nouns = hannanum.nouns(words)
        # print(nouns)
        # 영어
        compiler = re.compile('[^a-z | \\s]+')
        words = compiler.sub("", words.lower())
        for word, pos in nltk.pos_tag(nltk.word_tokenize(words)):
            # print(word)
            if pos == 'NN' or pos == 'NNP' or pos == 'NNS' or pos == 'NNPS':
                nouns.append(word)

        # tf_words3 = Counter(nouns)
        for noun in nouns:
            # todo: badword filter

            tf_words3[region].setdefault(noun, 0)
            tf_total.setdefault(noun, 0)
            tf_words3[region][noun] += 1
            tf_total[noun] += 1
        tf_words3[region] = dict(sorted(tf_words3[region].items(), key=operator.itemgetter(1), reverse=True))

    # print(4)
    for region, tf in tf_words3.items():
        try:
            t1 = str(region)[:2]
            t2 = str(region)[:5]
            tf_words2.setdefault(t2, Counter({}))
            tf_words1.setdefault(t1, Counter({}))
            tf_words1[t1] += Counter(tf)
            tf_words2[t2] += Counter(tf)
        except:
            continue

    #do,si 정렬
    for region, tf in tf_words1.items():
        tf_words1[region] = dict(sorted(tf_words1[region].items(), key=operator.itemgetter(1), reverse=True))
    for region, tf in tf_words2.items():
        tf_words2[region] = dict(sorted(tf_words2[region].items(), key=operator.itemgetter(1), reverse=True))


    # print(json.dumps(tf_words2,ensure_ascii=False))
    # print(json.dumps(tf_words1,ensure_ascii=False))
    # print(5)
    rd_keyword.set('do', json.dumps(tf_words1, ensure_ascii=False))
    rd_keyword.set('si', json.dumps(tf_words2, ensure_ascii=False))
    rd_keyword.set('dong', json.dumps(tf_words3, ensure_ascii=False))
    rd_keyword.set('total', json.dumps(dict(sorted(tf_total.items(), key=operator.itemgetter(1), reverse=True)), ensure_ascii=False))
    print("분석끝")
# 시.도별 / 구별/ 동별 or  한번에
sched.start()
# analyze()

# 'keyword' [1티어{'서울시':{}}
# 2티어{'노원구':{},}
# 3티어
#
# ]
