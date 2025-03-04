from flask import Flask, jsonify, render_template, request
import requests
from middlewares.logger import logger

app = Flask(__name__, template_folder='templates')

@app.before_request
@logger
def before_req():
  print('Before req')

@app.after_request
def after_req(response):
  print('After req')
  response.headers['X-Custom-Header'] = 'Hello'
  return response

@app.route('/foo')
def foo():
  response = requests.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
  posts = response.json()  
  return render_template("foo.html", posts=posts) 

@app.route('/')
def home():
  response = requests.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
  posts = response.json()  
  return render_template("index.html", posts=posts)  

@app.route('/secret')
def secret():
  return render_template('secret.html')

@app.route('/api/posts')
def get_posts():
  limit = request.args.get('limit', default=5, type=int)
  response = requests.get(f"https://jsonplaceholder.typicode.com/posts?_limit={limit}")
  return jsonify(response.json())

@app.route('/methods', methods=['GET', 'POST'])
def hello():
  if request.method == 'GET':
    return 'Hello', 200
  elif request.method == 'POST':
    return 'Goodbye', 500

@app.route('/greeting/<name>')
def greeting(name):
  return f"Hello {name}"

@app.route('/ping')
def ping():
  return 'ALIVE'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)