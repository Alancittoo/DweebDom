from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pin import seed_pins, undo_pins
from .board import seed_boards, undo_boards
from .board_pins import seed_board_pins, undo_board_pins
# from .follows import seed_follows, undo_follows
from .comment import seed_comments, undo_comments
from .tag import seed_tags, undo_tags
from .pin_tags import seed_pin_tags, undo_pin_tags
from .like import seed_like, undo_like

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_pins()
        undo_boards()
        undo_board_pins()
        # undo_follows()
        undo_comments()
        undo_tags()
        undo_pin_tags()
        undo_like
    seed_users()
    seed_pins()
    seed_boards()
    seed_board_pins()
    # seed_follows()
    seed_comments()
    seed_tags()
    seed_pin_tags()
    seed_like()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pins()
    undo_boards()
    undo_board_pins()
    # undo_follows()
    undo_comments()
    undo_tags()
    undo_pin_tags()
    undo_like
    # Add other undo functions here



# pipenv run flask db init
# pipenv run flask db migrate
# pipenv run flask db upgrade
# pipenv run flask seed all

# pipenv run flask seed undo
