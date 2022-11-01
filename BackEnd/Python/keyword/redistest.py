import konlpy
import redis
import operator
import json
import pickle

#명사추출.
hannanum= konlpy.tag.Hannanum()
tf_keyword_rank = {}
# print(hannanum.pos('아 배고파 점심메뉴 추천좀요'))

# get redis connection
rd_keyword = redis.StrictRedis(host='localhost', port=6379, db=0)
rd_message = redis.StrictRedis(host='localhost', port=6379, db=0)


# rd_keyword.set('노원구',json.dumps(nowon, ensure_ascii=False).encode('utf-8')


# 키워드 분석 : 1분마다update, 비동기, 백그라운드
# 메세지가 몇 만개 이상일 때 key 조회 속도issue?

class Message :
    def __init__(self,location,content):
        self.location = location
        self.content = content
def analyze():
    words = {}
    tf_words = {}

    # messages = rd_message.get('messages').values()
    messages=[Message('서울특별시 노원구 중계동','점심메뉴 추천 좀 부탁드립니다'), Message('서울특별시 강남구 역삼동','퇴근하고싶다 흑흑 점심메뉴'), Message('서울특별시 강남구 역삼동','점심메뉴 추천 좀 부탁드립니다')]

    for message in messages:
        # 지역별 dict, 카운트로 sort
        # 지역 00구 까지. location 에서 region 뽑기.
        region = message.location

        if words.setdefault(region,' '):
            words[region]+=" "+message.content
        # else:
        #     words[region]=message.content
        # word = words.setdefault(region,'')
    # tf추출
    for region, words in words.items():
        tf_words[region] = {}
        nouns = hannanum.nouns(words)
        for noun in nouns:
            tf_words[region].setdefault(noun, 0)
            tf_words[region][noun] += 1
        tf_words[region] = dict(sorted(tf_words[region].items(), key=operator.itemgetter(1),reverse=True))
    print(tf_words)


# 시.도별 / 구별/ 동별 or  한번에
def getList():
    global tf_words
    return tf_words

analyze()