import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # Init the DB
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    SQLALCHEMY_TRACK_MODIFICATIONS = False