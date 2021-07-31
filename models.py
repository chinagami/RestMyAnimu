from app import db, ma

# Anime class model
class Anime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer)
    # statuses are Completed, Watching, Dropped, Planning
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
class AnimuSchema(ma.Schema):
    # fields to expose
    class Meta:
        fields = ('id', 'title', 'rating', 'status', 'comment')

# Init schema
animu_schema = AnimuSchema()
# for dumping a collection
animus_schema = AnimuSchema(many=True)