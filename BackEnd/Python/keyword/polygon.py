import json
import os
from dotenv import load_dotenv


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR,".env"))
server_path = os.environ["JSON_PATH"]


class Polygon:
    def __init__(self):
        with open(server_path+'level1.json', 'r', encoding='UTF-8') as f:
            json_do = json.load(f)
        with open(server_path+'level2.json', 'r', encoding='UTF-8') as f:
            json_si = json.load(f)
        with open(server_path+'level3.json', 'r', encoding='UTF-8') as f:
            json_dong = json.load(f)

        self.do = {'082': {}}
        self.si = {}
        self.dong = {}

        for item in json_do:
            self.do['082'][item["properties"]["CTPRVN_CD"]] = {
                "polygon" : item["geometry"]["coordinates"]
            }
            self.si[item["properties"]["CTPRVN_CD"]] = {}

        for item in json_si:
            sno = str(item["properties"]["SIG_CD"])
            self.si[sno[0:2]][sno] = {
                "polygon" : item["geometry"]["coordinates"]
            }
            self.dong[sno] = {}

        for item in json_dong:
            sno = str(item["properties"]["EMD_CD"])
            self.dong[sno[0:5]][sno] = {
                "polygon" : item["geometry"]["coordinates"]
            }
ms = Polygon()