from app import app, db
from flask import request, jsonify
from models import *
from sqlalchemy import desc

# Check if anime ID exists
def find_anime_id(id):
    return Anime.query.filter_by(id=id).first()

# Add an anime
@app.route('/animu', methods=['POST'])
def add_animu():
    # get from the request all fields
    title = request.json['title']
    rating = request.json['rating']
    status = request.json['status'].capitalize()
    comment = request.json['comment']

    ratings = [1,2,3,4,5,6,7,8,9,10]
    statuses = ["Completed", "Watching", "Dropped", "Planning"]

    if status not in statuses or rating not in ratings:
        return jsonify({"Error":"Unable to add your anime!"})

    # Create new Anime object
    new_anime = Anime(title, rating, status, comment)
    db.session.add(new_anime)
    db.session.commit()

    return animu_schema.jsonify(new_anime)

# Return anime list
@app.route('/animu', methods=['GET'])
def get_animu():
    # search by query string if exists
    # return by status
    if request.args.get('status'):
        status_anime = Anime.query.filter_by(status=request.args.get('status').capitalize()).all()
        return animus_schema.jsonify(status_anime)

    # order by rating
    if request.args.get('rating'):
        order_rating_anime = Anime.query.order_by(desc(Anime.rating)).all()
        return animus_schema.jsonify(order_rating_anime)

    # get all by default
    all_anime = Anime.query.all()
    return animus_schema.jsonify(all_anime)
 
# Return single anime by ID
@app.route('/animu/<id>', methods=['GET'])
def get_single_animu(id):
    if not find_anime_id(id):
        return jsonify({'Error':'Anime not found!'})
    single_anime = Anime.query.get(id)
    return animu_schema.jsonify(single_anime)

# Update anime
@app.route('/animu/<id>', methods=['PUT'])
def update_animu(id):
    if not find_anime_id(id):
        return jsonify({'Error':'Anime not found!'})
    update_anime = Anime.query.get(id)
    title = request.json['title']
    rating = request.json['rating']
    status = request.json['status']
    comment = request.json['comment']

    update_anime.title = title
    update_anime.rating = rating
    update_anime.status = status
    update_anime.comment = comment 

    db.session.commit()

    return animu_schema.jsonify(update_anime)
 
# Delete an anime
@app.route('/animu/<id>', methods=['DELETE'])
def delete_animu(id):
    if not find_anime_id(id):
        return jsonify({'Error':'Anime not found!'})
    delete_anime = Anime.query.get(id)
    db.session.delete(delete_anime)
    db.session.commit()

    return animu_schema.jsonify(delete_anime)

