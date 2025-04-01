import pytest 
from app import create_app
from flask import json 

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login(client):
    response = client.post(
        '/api/auth/login',
        data=json.dumps({'username': 'testuser', 'password': 'password'}),
        content_type='application/json',
    )
    assert response.status_code == 200
    cookies = response.headers.getlist("Set-Cookie")  
    token_cookie = next((c for c in cookies if "token=" in c), None)

    assert token_cookie is not None, "Token cookie was not set!"

def test_login_fail(client):
    response = client.post(
        '/api/auth/login',
        data = json.dumps({'username': 'Markus', 'password': 'wrong-password'}),
        content_type='application/json',
    )
    assert response.status_code == 401
