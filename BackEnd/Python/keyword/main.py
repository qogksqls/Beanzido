from fastapi import FastAPI

import redistest
import redis
import json
import os
import polygon
from dotenv import load_dotenv


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR,".env"))
poly = polygon.poly

rd_keyword = redis.StrictRedis(host=os.environ["SERVER_IP"], port=os.environ["REDIS_PORT_KEYWORD"], db=0)
app = FastAPI()


@app.get("/keyword-server")
async def root():
    return "hello"


@app.get("/keyword-server/do")
async def dong():
    rd = json.loads(rd_keyword.get('do').decode())

    for key in poly.do['082']:
        if rd.get(key):
            poly.do['082'][key]['keywords'] = rd.get(key)
        else:
            poly.do['082'][key]['keywords'] = ''

    return poly.do['082']


@app.get("/keyword-server/si/{item_id}")
async def do(item_id):
    rd = json.loads(rd_keyword.get('si').decode())

    for key in poly.si[item_id]:
        if rd.get(key):
            poly.si[item_id][key]['keywords'] = rd.get(key)
        else:
            poly.si[item_id][key]['keywords'] = ''

    return poly.si[item_id]


@app.get("/keyword-server/dong/{item_id}")
async def si(item_id):
    rd = json.loads(rd_keyword.get('dong').decode())

    for key in poly.dong[item_id]:
        if rd.get(key):
            poly.dong[item_id][key]['keywords'] = rd.get(key)
        else:
            poly.dong[item_id][key]['keywords'] = ''

    return poly.dong[item_id]


@app.get("/keyword-server/ranking")
async def dong():
    return json.loads(rd_keyword.get('dong').decode())

