from fastapi import FastAPI

import redistest
import redis
import json
import os
from dotenv import load_dotenv

# import redistest


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR,".env"))

rd_keyword = redis.StrictRedis(host=os.environ["SERVER_IP"], port=os.environ["REDIS_PORT_KEYWORD"], db=0)
app = FastAPI()
@app.get("/keyword-server")
async def root():
    return "hello"

@app.get("/keyword-server/do")
async def do():
    return json.loads(rd_keyword.get('do').decode())
@app.get("/keyword-server/si")
async def si():
    return json.loads(rd_keyword.get('si').decode())
@app.get("/keyword-server/dong")
async def dong():
    return json.loads(rd_keyword.get('dong').decode())


