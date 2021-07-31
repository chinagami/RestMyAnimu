from app import app, db
from flask import request, jsonify
from models import *


# Add an anime
@app.route('/animu', methods=['POST'])
def add_animu():
    pass

# Return anime list
@app.route('/animu', methods=['GET'])
def get_animu():
    # get all by default

    # Return "certain" animes, maybe by rating or status?
    # Use query string; ex. /animu?rating=[#]
    pass

# Return single anime by ID
# Usage: TBD
@app.route('/animu/<id>', methods=['GET'])
def get_single_animu(id):
    pass

# Delete an anime
@app.route('/animu/<id>', methods=['DELETE'])
def delete_animu(id):
    pass

# Update anime
@app.route('/animu/<id>', methods=['PUT'])
def update_animu(id):
    pass
