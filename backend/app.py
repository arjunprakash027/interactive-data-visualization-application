from flask import Flask, request, jsonify
from visualizations import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
vis = visualize()

@app.route('/bar', methods=['POST'])
def bar():
    if request.method == 'POST':
        try:
            filter = request.json['filter']
            print(vis.count_bar(filter))
            return jsonify(vis.count_bar(filter))
        except Exception as e:
            print(e)
            return jsonify ({"message":'Error'})
    
@app.route('/constrains_bar', methods=['POST'])
def constrains_bar():
    if request.method == 'POST':
        filter1 = request.json['filter1']
        constrain = request.json['constrain']
        filter2 = request.json['filter2']
        return jsonify(vis.constrains_bar(filter1,constrain,filter2))

@app.route('/groupby_histo', methods=['POST'])
def group_by_histo():
    if request.method == 'POST':
        print("request send")
        filter1 = request.json['filter1']
        filter2 = request.json['filter2']
        return jsonify(vis.groupby_histo(filter1,filter2))

@app.route('/count_line', methods=['POST'])
def count_line():
    if request.method == 'POST':
        print("requested")
        filter = request.json['filter']
        return jsonify(vis.count_line(filter))

@app.route('/get_uniq_values', methods=['POST'])
def get_uniq_values():
    if request.method == 'POST':
        filter1 = request.json['filter1']
        return jsonify(vis.get_uniq_values(filter1))

if __name__ == '__main__':
    app.run(debug=True)