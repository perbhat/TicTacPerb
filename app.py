import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')


# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()



socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)

@socketio.on('turn')
def on_update(data):
    print(str(data))
    socketio.emit('turn', data,  broadcast=True, include_self=False)

@socketio.on('getleaderboard')
def getleaderboard():
    all_players = models.Player.query.all()
    players = []
    for player in all_players:
        players.append([player.username, player.score])

    players.sort(key=(lambda player: -player[1]))
    socketio.emit('getleaderboard', {'players':players}, broadcast=True, include_self=True)
    
    
    
    
@socketio.on('updateScore')
def updateScore(data):
    print(str(data))
    player =  db.session.query(models.Player).get(data['user'])
    player.score += int(data['score'])
    db.session.commit()
    print(player.score)
    getleaderboard()
    
    
    
    
    
    
    
@socketio.on('login')
def on_login(data):
    print("Something Happened")
    # print(#str(data))
    
    print(str(data))
    # print(data['currentUser'])
    exists = bool(models.Player.query.filter_by(username=data['currentUser']).first())
    if not exists:
        new_user = models.Player(username=data['currentUser'], score=100)
        db.session.add(new_user)
        db.session.commit()

    socketio.emit('login', {'users': data['users']}, broadcast=True, include_self=True)
    getleaderboard()

@socketio.on('reset')
def on_reset(data):
    print('reset')
    socketio.emit('reset', data, broadcast=True, include_self=False)


# @socketio.on('join')
# def on_join(data):



if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True,
    )

    


# # Note that we don't call app.run anymore. We call socketio.run with app arg
# socketio.run(
#     app,
#     host=os.getenv('IP', '0.0.0.0'),
#     port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
#     debug=True
# )



# Note we need to add this line so we can import app in the python shell

