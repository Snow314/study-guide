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
from helper import *


topic = "Evolution"
prompt = """Create a set of notes based on this content. Be extremely verbose and through. Make it jot notes form

        focus on the topic of {} if possible
        Give me the result in format: 
        {{
        "notes" : "<notes>"
        }}
        .""".format(topic)

# prompt = """Given these texts: break them down granularly into a study guide. Use a minimum of 5 topics and maxium of 10 topics. Give the result in this form 
#             ["topic1", "topic2", "topic3", ...]"""

extracted_pdf_text = extract_pdf("https://www.ugr.es/~jmgreyes/evolsynop.pdf")
index = index_text(extracted_pdf_text)
query_engine = index.as_query_engine()
response = query_engine.query(prompt)

print(response)