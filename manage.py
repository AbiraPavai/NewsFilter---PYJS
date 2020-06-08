from bs4 import BeautifulSoup
import requests
import json


class NewsFilter:

    def process(self):
        page1 = requests.get("http://www.newsonair.com/regional-audio.aspx")
        soup1 = BeautifulSoup(page1.content, 'html.parser')

        table1 = soup1.find("table")
        rows1 = table1.findAll("tr")

        language_list = []
        region_lang_map = dict()

        for i in range(1, len(rows1)):
            temp = rows1[i].findAll("td")
            region = temp[0].text.strip()
            lang = temp[1].text.strip()
            news_time = temp[2].text.strip()
            news_date = temp[5].text.strip()
            news_link = temp[3].find("audio")["src"]

            language_list.append(lang)
            if lang not in region_lang_map.keys():
                region_lang_map[lang] = dict()
                region_lang_map[lang] = {region: list(list())}
                region_lang_map[lang] = {region: [[news_link], [news_time], [news_date]]}

            else:
                if region not in region_lang_map[lang]:
                    region_lang_map[lang][region] = [[news_link], [news_time], [news_date]]
                else:
                    region_lang_map[lang][region][0].append(str(news_link))
                    region_lang_map[lang][region][1].append(str(news_time))
                    region_lang_map[lang][region][2].append(str(news_date))

        language_list = list(dict.fromkeys(language_list))
        # print(region_lang_map)
        region_lang_map = json.dumps(region_lang_map)
        return language_list, region_lang_map
