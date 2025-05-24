from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load data from JSON file
def get_designers():
    with open('designers.json', 'r') as f:
        return json.load(f)

@app.route('/api/designers', methods=['GET'])
def designers():
    return jsonify(get_designers())

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')