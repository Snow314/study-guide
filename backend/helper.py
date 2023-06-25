import requests
import PyPDF2
import random
from langchain.chat_models import ChatOpenAI
from llama_index.readers.schema.base import Document
from llama_index import (GPTTreeIndex, GPTListIndex,
                         LLMPredictor, ServiceContext, GPTVectorStoreIndex)
from langchain.chat_models import ChatOpenAI

def index_text(text):
    llm_predictor = LLMPredictor(llm=ChatOpenAI(
        temperature=0, model_name="gpt-3.5-turbo"))  # type: ignore
    service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor)
    index = GPTVectorStoreIndex.from_documents(
        [Document(text)], service_context=service_context
    )
    return index

def download_pdf(url, save_path):
    response = requests.get(url)
    with open(save_path, 'wb') as file:
        file.write(response.content)

def read_pdf(file_path):
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)
        extracted_text = ""
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            extracted_text += page.extract_text()
        
        return extracted_text
    

def extract_pdf(url):
    random_numbers = [str(random.randint(0, 9)) for _ in range(10)]
    random_string = ''.join(random_numbers)
    save_path = "./pdfs/file_{}.pdf".format(random_string)
    download_pdf(url, save_path)
    return read_pdf(save_path)
