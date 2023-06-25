import json
from flask import Flask, render_template, request, send_from_directory, jsonify
from functools import wraps
from flask_cors import CORS
from time import time
import openai
import os

app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
CORS(app)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/analyze-topics", methods=["POST"])
def analyze_topics():
    topics = request.get_json()["topics"]

    prompt = """Given these topics: [{}] break them down granularly into a study guide. Give the result in this form 
            ["topic1", "topic2", "topic3"] ...""".format(topics)

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=2000,
        temperature=0
        )

    return str(response["choices"][0]["text"]), 200

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
