from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Pin, Comment
from ..forms.comment_form import CommentForm, CommentUpdateForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/userComments')
@login_required
def user_comments():
    user_id = current_user.id
    res = Comment.query.filter_by(user_id = user_id).all()
    return {"UsersComments": [comment.to_dict() for comment in res]}

@comment_routes.route('/newComment', methods=['POST'])
@login_required
def new_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            comment=form.data['comment'],
            user_id=current_user.id,
            pin_id=form.data['pin_id']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': form.errors}, 400

@comment_routes.route('/update/<int:id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    form = CommentUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(comment_id)
        if comment and comment.user_id == current_user.id:
            comment.comment = form.data['comment']
            db.session.commit()
            return comment.to_dict()
        else:
            return {'errors': ['Unauthorized or comment not found']}, 401
    return {'errors': form.errors}, 400

@comment_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment and comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted'}
    else:
        return {'errors': ['Unauthorized or comment not found']}, 401

@comment_routes.route('/pin/<int:pin_id>', methods=['GET'])
def comments_by_pin(pin_id):
    comments = Comment.query.filter_by(pin_id=pin_id).all()
    return {"pinComments": [comment.to_dict() for comment in comments]}

#May need later but for now not being used 
# @comment_routes.route('/<int:id>', methods=['GET'])
# def get_comment(id):
#     comment = Comment.query.get(id)
#     if comment:
#         return comment.to_dict()
#     else:
#         return {'errors': ['Comment not found']}, 404
