from flask import Flask, request, session
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from models import db, User, Projects, OwnerUser


app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)


@app.route('/')
def index():
    return 'Hello World'

def authorize_user():
    user_id = session['user_id']
    current_user = User.query.get(user_id)
    try:
        if current_user:
            return current_user, 200
    except:
        return {'error': 'User must be logged in to continue'}, 401

def authorize_owner():
    owner_id = session['owner']
    print(owner_id['id'])
    current_owner = OwnerUser.query.filter(OwnerUser.id == owner_id['id']).first()
    # print(current_owner)
    if not current_owner:
        return {"error": "Not authorized to do this action"}, 401
    else:
        return current_owner.to_dict()
    




# region SIGNUP AND LOGIN ROUTES NEED TO ADD AUTH
@app.post('/signup/user')
def signup_user():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(
        data['password']).decode('utf-8')
    new_user = User(name=data['name'], username=data['username'], email=data['email'],
                    password=hashed_password, location=data['location'], experience=data['experience'], bio=data['bio'])
    db.session.add(new_user)
    db.session.commit()
    session['user'] = new_user.to_dict()
    return new_user.to_dict(), 200


@app.post('/signup/owner')
def signup_owner():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_owner = OwnerUser(name=data['name'], username=data['username'], email=data['email'], password=hashed_password, location=data['location'], experience=data['experience'], bio=data['bio'])
    db.session.add(new_owner)
    db.session.commit()
    session['owner'] = new_owner.to_dict()
    return new_owner.to_dict(), 200


@app.post('/login/users')
def user_login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if user:
        if bcrypt.check_password_hash(user.password, data['password']):
            session['user'] = user.to_dict()
            return user.to_dict(), 200
    else:
        return {'error': 'Invalid Credentials'}, 401


@app.post('/login/owners')
def owner_login():
    data = request.json
    owner = OwnerUser.query.filter_by(username=data['username']).first()
    if owner:
        if bcrypt.check_password_hash(owner.password, data['password']):
            session['owner'] = owner.to_dict()
            return owner.to_dict(), 200
    else:
        return {"error": 'Invalid Credentials'}, 401


@app.post('/logout')
def logout():
    current_user = User.query.get(session['user']['id'])
    current_owner = OwnerUser.query.get(session['owner']['id'])
    if current_user:
        session.pop('user', None)
        return {'message': 'User logged out'}, 200
    elif current_owner:
        session.pop('owner', None)
        return {'message': 'Owner logged out'}, 200
    else:
        return {'error': 'Must be logged in to logout'}, 500
# endregion


# region GET ROUTES


@app.get('/users')
def get_users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@app.get('/users/<int:id>')
def get_user(id):
    try:
        user = User.query.get(id)
        return user.to_dict()
    except:
        return {'error': 'User Not Found'}, 404


@app.get('/owners')
def get_owners():
    try:
        owners = OwnerUser.query.all()
        return {'owners': [owner.to_dict() for owner in owners]}
    except:
        return {'message': 'Something went wrong'}, 500


@app.get('/owners/<int:id>')
def get_owner(id):
    try:
        owner = OwnerUser.query.get(id)
        return owner.to_dict()
    except:
        return {'error': 'Owner Not Found'}, 404


@app.get('/projects')
def get_projects():
    projects = Projects.query.all()
    try:
        projects = Projects.query.all()
        return {'projects': [project.to_dict() for project in projects]}
    except:
        return {'message': 'Something went wrong'}, 500


@app.get('/projects/<int:id>')
def get_project(id):
    try:
        project = Projects.query.get(id)
        return project.to_dict()
    except:
        return {'error': 'Project Not Found'}, 404
# endregion




# region PATCH ROUTES
@app.patch('/users/<int:id>')
def update_user(id):
    authorize_user()
    try:
        data = request.json
        user = User.query.where(User.id == id).update(data)
        db.session.commit()
        user = User.query.get(id)
        return user.to_dict()
    except:
        return {'error': 'User Not Found'}, 404


@app.patch('/owners/<int:id>')
def update_owner(id):
    current_owner = authorize_owner()
    if current_owner:
        data = request.json
        owner = OwnerUser.query.get(id)
        if owner.id == current_owner['id']:
            for attr in data:
                setattr(owner, attr, data[attr])
            # owner = OwnerUser.query.where(OwnerUser.id == id).update(data)
            db.session.commit()
            # owner = OwnerUser.query.get(id)
            return owner.to_dict()
        else:
            return {'error': 'Something went wrong'}, 500


@app.patch('/projects/<int:id>')
def update_project(id):
    current_owner = authorize_owner()
    print(current_owner)
    try:
        data = request.json
        project = Projects.query.get(id)
        print(project)
        if project.owner_id == current_owner["id"]:
            project = Projects.query.where(Projects.id == id).update(data)
            db.session.add(project)
            db.session.commit()
            return project.to_dict()
        else:
            return {'error': 'Only Project Owners Can Update Projects'}

    except:
            return {'error': 'Project Not Found'}, 404



    # try:
    #     data = request.json
    #     project = Projects.query.where(Projects.id == id).update(data)
    #     db.session.commit()
    #     project = Projects.query.get(id)
    #     return project.to_dict()
    # except:
    #     return {'error': 'Project Not Found'}, 404
# endregion



# CREATE NEW PROJECT ROUTE
@app.post('/projects/create')
def create_project():
    current_owner= authorize_owner()
    try:
        data = request.json
        new_project = Projects(title=data['title'], description=data['description'], location=data['location'], genre=data['genre'], owner_id=current_owner['id'])
        print(new_project)
        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    except:
        return {'error': 'Project Could Not Be Created'}, 404



# region DELETE ROUTES
@app.delete('/projects/<int:id>')
def delete_project(id):
    current_owner = authorize_owner()
    project = Projects.query.get(id)
    if project.owner_id == session['owner']['id']:
        print(project)
        db.session.delete(project)
        db.session.commit()
        return {"message": 'Project Deleted'}, 200
    elif project.owner_id != session['owner']['id']:
        return {"message": 'You must be the owner of this project to delete it'}, 401
    else:
        return {"message": 'Project not found'}, 404

@app.delete('/users/<int:id>')
def delete_user(id):
    current_user= authorize_user()
    user = User.query.get(id)
    if current_user:
            db.session.delete(user)
            db.session.commit()
            return {'message': 'Your account has been deleted'}
    else:
            return {'error': 'User Not Found'}, 404

@app.delete('/owners/<int:id>')
def delete_owner(id):
    current_owner = authorize_owner()
    if current_owner:
        try:
            owner = OwnerUser.query.get(id)
            db.session.delete(owner)
            db.session.commit()
            return {'message': 'Your account has been deleted'}
        except:
            return {'error': 'Owner Not Found'}, 404

# endregion






if __name__ == '__main__':
    app.run(port=5555, debug=True)
