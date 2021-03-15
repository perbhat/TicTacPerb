"""Backend for TicTacToe app using Flask and SQLAlchemy"""
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
# from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
# IMPORTANT: This must be AFTER creating DB variable to prevent
# circular import issues
import models

DB.create_all()

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """default filename function"""
    return send_from_directory('./build', filename)


@SOCKETIO.on('connect')
def on_connect():
    """When a client connects to this Socket connection, this function is run"""
    print('User connected!')


@SOCKETIO.on('disconnect')
def on_disconnect():
    """When a client disconnects from this Socket connection, this function is run"""
    print('User disconnected!')


@SOCKETIO.on('turn')
def on_update(data):
    """Occurs when user does a turn"""
    print(str(data))
    SOCKETIO.emit('turn', data, broadcast=True, include_self=True)
    return data

@SOCKETIO.on('getleaderboard')
def getleaderboard():
    """Occurs when user wants to see leaderboard"""
    players = acquire_leaderboard()
    players.sort(key=(lambda player: -player[1]))
    SOCKETIO.emit('getleaderboard', {'players': players},
                  broadcast=True,
                  include_self=True)
def acquire_leaderboard():
    """Helper function to get leaderboard"""
    all_players = models.Player.query.all()
    players = []
    for player in all_players:
        players.append([player.username, player.score])
    return players


@SOCKETIO.on('update_score')
def update_score(data):
    """Occurs when user wins"""
    print(str(data))
    player = DB.session.query(models.Player).get(data['user'])
    player.score = add_score(player.score, int(data['score']))
    DB.session.commit()
    print(player.score)
    getleaderboard()
def add_score(score, number):
    """adds value to the player score"""
    return score + number


@SOCKETIO.on('login')
def on_login(data):
    """Occurs when user logs in"""
    print("Something Happened")
    print(str(data))
    exists = bool(
        models.Player.query.filter_by(username=data['currentUser']).first())
    if not exists:
        users = add_user(data['currentUser'])
    SOCKETIO.emit('login', {'users': data['users']},
                  broadcast=True,
                  include_self=True)
    getleaderboard()

def add_user(user):
    """Helper function to add a user into database"""
    new_user = models.Player(username=user, score=100)
    DB.session.add(new_user)
    DB.session.commit()
    all_players = models.Player.query.all()
    users = []
    for player in all_players:
        users.append(player.username)
    return users



@SOCKETIO.on('reset')
def on_reset(data):
    """Occurs when user resets board"""
    print('reset')
    SOCKETIO.emit('reset', data, broadcast=True, include_self=False)


# @SOCKETIO.on('join')
# def on_join(data):

if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
        debug=True,
    )

# # Note that we don't call app.run anymore. We call SOCKETIO.run with app arg
# SOCKETIO.run(
#     app,
#     host=os.getenv('IP', '0.0.0.0'),
#     port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
#     debug=True
# )

# Note we need to add this line so we can import app in the python shell
