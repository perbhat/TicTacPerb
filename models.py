"""Database model for a player"""
from app import DB


class Player(DB.Model):
    """Database model for a player"""
    username = DB.Column(DB.String(80),
                         unique=True,
                         nullable=False,
                         primary_key=True)
    score = DB.Column(DB.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Player %r>' % self.username
