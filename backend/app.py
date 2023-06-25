import json
from flask import Flask, render_template, request, send_from_directory, jsonify
from functools import wraps
from flask_cors import CORS
from time import time
import openai
import os
from langchain.chat_models import ChatOpenAI
from helper import *
from llama_index.readers.schema.base import Document
from llama_index import (GPTTreeIndex, GPTListIndex,
                         LLMPredictor, ServiceContext)

app = Flask(__name__, static_url_path='', static_folder='../frontend/build')
CORS(app)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/analyze-topics", methods=["POST"])
def analyze_topics():
    topics = request.get_json()["topics"].split(',')

    extracted_pdf_text = ""

    for topic in topics:
        extracted_pdf_text += extract_pdf(topic)

    prompt = """Given these texts: break them down granularly into a study guide. Give the result in this form 
            ["topic1", "topic2", "topic3"]"""

    index = index_text(extracted_pdf_text)
    query_engine = index.as_query_engine()
    response = query_engine.query(prompt)

    return str(response), 200

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
