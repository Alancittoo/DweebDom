from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

follow_routes = Blueprint('follows', __name__)

@follow_routes.route('/follow', methods=['POST'])
@login_required
def follow_user():
    user_to_follow_id = request.get_json()["user_id"]
    user_to_follow = User.query.get(user_to_follow_id)

    if user_to_follow is None:
        return jsonify({"error": "User not found"}), 404

    current_user.followed.append(user_to_follow)

    db.session.commit()
    return jsonify({"message": f"Successfully followed {user_to_follow.username}"}), 200

@follow_routes.route('/unfollow', methods=['POST'])
@login_required
def unfollow_user():
    user_to_unfollow_id = request.get_json()["user_id"]
    user_to_unfollow = User.query.get(user_to_unfollow_id)

    if user_to_unfollow is None:
        return jsonify({"error": "User not found"}), 404

    if user_to_unfollow in current_user.followed:
        current_user.followed.remove(user_to_unfollow)
        db.session.commit()
        return jsonify({"message": f"Successfully unfollowed {user_to_unfollow.username}"}), 200
    else:
        return jsonify({"error": "You are not following this user"}), 400

@follow_routes.route('/<int:user_id>/following', methods=['GET'])
@login_required
def get_following(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    following = [user.to_dict() for user in user.followed]
    return jsonify(following), 200

@follow_routes.route('/<int:user_id>/followers', methods=['GET'])
@login_required
def get_followers(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404

    followers = [user.to_dict() for user in user.followers]
    return jsonify(followers), 200
