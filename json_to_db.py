import sqlite3
import json

with open('jsondata.json','r',encoding='utf-8') as file:
    data = json.load(file)

conn = sqlite3.connect('jsondata.db')
cursor = conn.cursor()

def create_table(cursor,columns):
    column_list = ', '.join(columns)
    query = 'CREATE TABLE IF NOT EXISTS USINDUSTRY ({})'.format(column_list)
    cursor.execute(query)
    return query

print(create_table(cursor,list(data[0].keys())))
conn.commit()

def add_values(cursor,values):
    query = 'INSERT INTO USINDUSTRY VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    cursor.execute(query,values)
    return "{} added to database".format(values)

for x in data:
    print(add_values(cursor,list(x.values())))

conn.commit()
conn.close()




