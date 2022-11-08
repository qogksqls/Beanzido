import json


class Polygon:
    def __init__(self):
        with open('C:\workspace\project3\BackEnd\Python\keyword\level1.json', 'r', encoding='UTF-8') as f:
            json_do = json.load(f)
        with open('C:\workspace\project3\BackEnd\Python\keyword\level2.json', 'r', encoding='UTF-8') as f:
            json_si = json.load(f)
        with open('C:\workspace\project3\BackEnd\Python\keyword\level3.json', 'r', encoding='UTF-8') as f:
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