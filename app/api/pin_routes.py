from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Pin
from ..forms.pin_form import PinForm

pin_routes = Blueprint('pins', __name__)

#READ
@pin_routes.route('/allPins')
@login_required
def all_pins():
    res = Pin.query.all()
    return {'Pins': [pin.to_dict()for pin in res]}

@pin_routes.route('/singlePin/<int:pin_id>')
@login_required
def single_pin(pin_id):
    pin = Pin.query.get(pin_id)

    return pin.to_dict()

@pin_routes.route('/newPin', methods=['POST'])
@login_required
def create_pin():
    user = current_user
    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        # data = request.get_json()
        new_pin = Pin(
            image_url = form.data['image_url'],
            title = form.data['title'],
            description = form.data['description'],
            user_id = user.id
        )
        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict(), 201
    if form.errors:
        return form.errors


@pin_routes.route('/update/<int:pin_id>', methods=['PUT'])
@login_required
def update_pin(pin_id):
    pin = Pin.query.get(pin_id)
    form = PinForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        pin.image_url = form.data['image_url']
        pin.title = form.data['title']
        pin.description = form.data['description']

        db.session.add(pin)
        db.session.commit()
        return pin.to_dict(), 201
    else:
        return form.errors

@pin_routes.route('/delete/<int:pin_id>', methods=['DELETE'])
@login_required
def delete_pin(pin_id):
    pin = Pin.query.get(pin_id)

    if not pin:
        return {'mesage': "PIN NOT FOUND"}, 404
    if pin.user_id != current_user.id:
        return {"error": "You aren't Authorized to delete this item"}, 400

    db.session.delete(pin)
    db.session.commit()
    return {'mesage': "PIN DELETED"}, 200
