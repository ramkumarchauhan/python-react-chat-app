from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])  # Allow frontend origin
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5173"])  # Allow Socket.IO connections

# Dummy database
users = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users:
        return jsonify({'msg': 'User already exists!'}), 400

    users[username] = {
        'password': generate_password_hash(password)
    }
    return jsonify({'msg': 'User registered successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = users.get(username)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'msg': 'Invalid credentials'}), 401

    token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'])
    return jsonify({'access_token': token}), 200

@socketio.on('message')
def handle_message(data):
    socketio.emit('message', data)

if __name__ == '__main__':
    socketio.run(app, debug=True)
