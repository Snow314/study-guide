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

    prompt = """Given these texts: break them down granularly into a study guide. Use a minimum of 5 topics and maxium of 10 topics. Give the result in this form 
            ["topic1", "topic2", "topic3", ...]"""

    index = index_text(extracted_pdf_text)
    query_engine = index.as_query_engine()
    response = query_engine.query(prompt)

    return str(response), 200

@app.route("/api/flashcards", methods=["POST"])
def get_flashcards():
    links = request.get_json()["links"].split(',')
    topic = request.get_json()["topic"].split(',')

    extracted_pdf_text = ""

    for link in links:
        extracted_pdf_text += extract_pdf(link)


    prompt = """Create a set of flashcards based on this content. 

        focus on the topic of {} if possible
        Give me the result in format: 
        [{{
        "question": "<question>",
        "answer": "<answer>",
        }},
        {{
        "question": "<question>",
        "answer": "<answer>",
        }}
        ...].""".format(topic)

    index = index_text(extracted_pdf_text)
    query_engine = index.as_query_engine()
    response = query_engine.query(prompt)
 
    return str(response), 200


@app.route("/api/notes", methods=["POST"])
def get_notes():
    links = request.get_json()["links"].split(',')
    topic = request.get_json()["topic"].split(',')

    extracted_pdf_text = ""

    for link in links:
        extracted_pdf_text += extract_pdf(link)


    prompt = """Create a set of notes based on this content. Be extremely verbose and through. Make it jot notes form

        focus on the topic of {} if possible
        Give me the result in format: 
        {{
        "notes" : "<notes>"
        }}
        .""".format(topic)

    index = index_text(extracted_pdf_text)
    query_engine = index.as_query_engine()
    response = query_engine.query(prompt)
 
    return str(response), 200


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
