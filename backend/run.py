from app import app, socketio  # Import the app and socketio instances

if __name__ == '__main__':
    socketio.run(app, debug=True)  # Run the server
