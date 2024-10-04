from flask import request
from database import db, Message, User

def setup_socket_events(socketio):
    @socketio.on('message')
    def handle_message(data):
        username = data.get('username')
        content = data.get('content')
        image_url = data.get('image_url', None)

        user = User.query.filter_by(username=username).first()
        if user:
            new_message = Message(user_id=user.id, content=content, image_url=image_url)
            db.session.add(new_message)
            db.session.commit()
            socketio.emit('message', {'username': username, 'content': content, 'image_url': image_url})
