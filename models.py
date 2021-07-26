from app import db

# Anime class model
class Anime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer)
    # statuses are Completed, Watching, Dropped, Plan to
    status = db.Column(db.String(20))
    comment = db.Column(db.String(100))

    def __init__(self, title, rating, status, comment):
        self.title = title
        self.rating = rating
        self.status = status
        self.comment = comment

    def __repr__(self):
        return f'<Anime title: {self.title}>'


# Anime schema
