from flask import Flask, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)


@app.route('/tokped/simple')
def simple():
    keyword = request.args.get('keyword')
    min_price = request.args.get('min_price') or '0'
    page = request.args.get('page') or '1'
    start = str((int(page) * 200) - 200)

    url = "https://gql.tokopedia.com"

    body = {
        "query": "query SearchProductQueryV4($params: String!) {\n  ace_search_product_v4(params: $params) {\n    header {\n      totalData\n    }\n    data {\n      suggestion {\n        currentKeyword\n      }\n      products {\n        id\n        name\n        badges {\n          title\n          imageUrl\n          show\n          __typename\n        }\n        imageUrl\n        labelGroups {\n          position\n          title\n          type\n          __typename\n        }\n        price\n        rating\n        ratingAverage\n        shop {\n          id\n          name\n          url\n          city\n          isOfficial\n          isPowerBadge\n        }\n        url\n      }\n    }\n  }\n}\n",
        "variables": {
            "params": "device=desktop&q=" + keyword + "&related=true&rows=200&source=search&pmin=" + min_price + "&page=" + page + "&start=" + start
        }
    }

    try:
        raw_res = requests.post(url, json=body).json()[
            "data"]["ace_search_product_v4"]
        total_data = raw_res["header"]["totalData"]
        keyword = raw_res["data"]["suggestion"]["currentKeyword"]
        products = raw_res["data"]["products"]

        productArray = []

        for product in products:
            labels = product["labelGroups"]
            if len(labels) > 0:
                for label in labels:
                    if label["position"] == "integrity":
                        sold_text = label["title"]
                        break
                    else:
                        sold_text = "Terjual 0"
            else:
                sold_text = "Terjual 0"

            productArray.append({
                "name": product["name"],
                "price": product["price"],
                "rating_average": product["ratingAverage"],
                "sold": sold_text,
                "url": product["url"],
                "image_url": product["imageUrl"]
            })

        message = {
            # "raw": raw_res,
            "total_data": total_data,
            "keyword": keyword,
            "products": productArray
        }

    except Exception as e:
        message = {
            "message": e
        }

    return json.dumps(message, indent=2)


# @app.route('/tokped/all')
# def searching():
#     keyword = request.args.get('search')
#     min_price = request.args.get('min_price') or '0'
#     # page = request.args.get('page') or '1'
#     # start = str(int(page) * 200)
#     page = '1'
#     start = '0'

#     url = "https://gql.tokopedia.com"

#     all_data = []

#     body = {
#         "query": "query SearchProductQueryV4($params: String!) {\n  ace_search_product_v4(params: $params) {\n    header {\n      totalData\n    }\n    data {\n      suggestion {\n        currentKeyword\n      }\n      products {\n        id\n        name\n        badges {\n          title\n          imageUrl\n          show\n          __typename\n        }\n        imageUrl\n        labelGroups {\n          position\n          title\n          type\n          __typename\n        }\n        price\n        rating\n        ratingAverage\n        shop {\n          id\n          name\n          url\n          city\n          isOfficial\n          isPowerBadge\n        }\n        url\n      }\n    }\n  }\n}\n",
#         "variables": {
#             "params": "device=desktop&q=" + keyword + "&related=true&rows=200&source=search&pmin=" + min_price + "&page=" + page + "&start=" + start
#         }
#     }

#     try:
#         raw_res = requests.post(url, json=body, timeout=9).json()
#         total_data = raw_res["data"]["ace_search_product_v4"]["header"]["totalData"]
#         total_page = int(total_data / 200)

#         for i in range(total_page):
#             if i == 0:
#                 continue

#             page = str(i)
#             start = str((int(page) * 200) - 200)
#             print(page)
#             print(start)
#             all_data.append(requests.post(
#                 url, json={
#                     "query": "query SearchProductQueryV4($params: String!) {\n  ace_search_product_v4(params: $params) {\n    header {\n      totalData\n    }\n    data {\n      suggestion {\n        currentKeyword\n      }\n      products {\n        id\n        name\n        badges {\n          title\n          imageUrl\n          show\n          __typename\n        }\n        imageUrl\n        labelGroups {\n          position\n          title\n          type\n          __typename\n        }\n        price\n        rating\n        ratingAverage\n        shop {\n          id\n          name\n          url\n          city\n          isOfficial\n          isPowerBadge\n        }\n        url\n      }\n    }\n  }\n}\n",
#                     "variables": {
#                         "params": "device=desktop&q=" + keyword + "&related=true&rows=200&source=search&pmin=" + min_price + "&page=" + page + "&start=" + start
#                     }
#                 }, timeout=9).json())

#         # products = raw_res["data"]["ace_search_product_v4"]["data"]["products"]
#         # final_product = []

#         # for product in products:
#         #     sold = product["labelGroups"]
#         #     for s in sold:
#         #         if s["position"] == "integrity":
#         #             try:
#         #                 sold_text = s["title"].split(
#         #                     "Terjual ")[1].split(' ')[0]
#         #                 sold_text_split = sold_text.split(",")
#         #                 sold_num = (
#         #                     int(sold_text_split[0]) * 1000) + (int(sold_text_split[1]) * 100)
#         #             except:
#         #                 sold_text = s["title"].split("Terjual ")[1]
#         #                 sold_num = int(sold_text)
#         #         else:
#         #             sold_num = 0

#         #     final_product.append({
#         #         "product_name": product["name"],
#         #         "price": product["price"],
#         #         "url": product["url"],
#         #         "sold_text": sold_num
#         #     })

#         # res = {
#         #     "keyword": keyword,
#         #     "totalData": total_data,
#         #     "product": final_product
#         # }
#         res = all_data
#     except IndexError as e:
#         res = {
#             "message": "error " + e
#         }

#     return json.dumps(res, indent=2)


if __name__ == '__main__':
    app.run(debug=True)
