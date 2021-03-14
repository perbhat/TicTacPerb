from app import db

class Player(db.Model):
    username = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    score = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return '<Player %r>' % self.username