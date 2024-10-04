from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from database import db, User

def setup_auth(app):
    @app.route('/register', methods=['POST'])
    def register():
        data = request.json
        if User.query.filter_by(username=data['username']).first():
            return jsonify({"msg": "User already exists"}), 400
        new_user = User(
            username=data['username'],
            password=generate_password_hash(data['password'])
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User registered successfully"}), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if user and check_password_hash(user.password, data['password']):
            token = create_access_token(identity=user.username)
            return jsonify(access_token=token), 200
        return jsonify({"msg": "Bad username or password"}), 401

    @app.route('/profile', methods=['GET', 'PUT'])
    @jwt_required()
    def profile():
        username = get_jwt_identity()
        user = User.query.filter_by(username=username).first()
        if request.method == 'GET':
            return jsonify(username=user.username, bio=user.bio, profile_pic=user.profile_pic), 200
        else:
            data = request.json
            user.bio = data.get('bio', user.bio)
            user.profile_pic = data.get('profile_pic', user.profile_pic)
            db.session.commit()
            return jsonify({"msg": "Profile updated"}), 200
