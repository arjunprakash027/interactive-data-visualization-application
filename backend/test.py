import requests
import json

url = 'http://localhost:5000/bar'
url2 = 'http://localhost:5000/count_line'
data = {'filter': 'likelihood'}

response = requests.post(url, data=data)

if response.status_code == 200:
    print(json.loads(response.content.decode()))
else:
    print(response.status_code)


response = requests.post(url2, data=data)
if response.status_code == 200:
    print(json.loads(response.content.decode()))
else:
    print(response.status_code)
    
