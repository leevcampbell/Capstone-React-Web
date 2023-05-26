from flask import Flask, request, session
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from models import db, User, Projects, OwnerUser, MatchedUsers
# from flask_cors import CORS


app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

# CORS(app)

@app.route('/')
def homepage():
    return {'message': 'Welcome to the backend!'}


@app.route('/user-homepage')
def user_index():
    authorize_user()
    current_user = User.query.get(session['user']['id'])
    # print(session['user'])
    if current_user:
        return current_user.to_dict(), 200
    else:
        return {'error': 'User must be logged in to continue'}, 401

@app.route('/owner-homepage')
def owner_index():
    authorize_owner()
    current_owner = OwnerUser.query.get(session['user']['id'])
    if current_owner:
        return current_owner.to_dict(), 200
    else:
        return {'error': 'Owner must be logged in to continue'}, 401


# works for: matchpage, 
def authorize_user():
    # # print(session)
    user_id = session['user']
    current_user = User.query.filter(User.id == user_id["id"]).first()
    if current_user:
            return current_user, 200
    else:
        return {'error': 'User must be logged in to continue'}, 401

def authorize_owner():
    print(session)
    owner_id = session['user']
    print(owner_id['id'])
    current_owner = OwnerUser.query.filter(OwnerUser.id == owner_id['id']).first()
    
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
                    password=hashed_password, location=data['location'])
    db.session.add(new_user)
    db.session.commit()
    session['user'] = new_user.to_dict()
    # print(session['user'])
    return new_user.to_dict(), 200


@app.post('/signup/owner')
def signup_owner():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_owner = OwnerUser(name=data['name'], username=data['username'], email=data['email'], password=hashed_password, location=data['location'])
    # print(new_owner)
    db.session.add(new_owner)
    db.session.commit()
    session['user'] = new_owner.to_dict()
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
            session['user'] = owner.to_dict()
            return owner.to_dict(), 200
    else:
        return {"error": 'Invalid Credentials'}, 401


@app.delete('/logout')
def logout():
    current_user = User.query.get(session['user']['id'])
    current_owner = OwnerUser.query.get(session['user']['id'])
    if current_user:
        print(current_user, session['user'])
        session.pop('user', None)
        return {'message': 'User logged out'}, 200
    elif current_owner:
        print(current_owner, session['user'])
        session.pop('user', None)
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
    current_owner=authorize_owner()
    try:
        owner = OwnerUser.query.where(current_owner.id == id).first()
        print(owner)
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
@app.patch('/users/edit/<int:id>')
def update_user(id):
    current_user = authorize_user()
    try:
        data = request.json
        user = User.query.where(User.id == id).update(data)
        db.session.commit()
        user = User.query.get(id)
        return user.to_dict()
    except:
        return {'error': 'User Not Found'}, 404


@app.patch('/owners/edit/<int:id>')
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
    # print(current_owner)
    try:
        data = request.json
        project = Projects.query.get(id)
        # print(project)
        if project.owner_id == current_owner["id"]:
            project = Projects.query.where(Projects.id == id).update(data)
            db.session.add(project)
            db.session.commit()
            return project.to_dict()
        else:
            return {'error': 'Only Project Owners Can Update Projects'}

    except:
            return {'error': 'Project Not Found'}, 404
# endregion



# CREATE NEW PROJECT ROUTE
@app.post('/projects/create')
def create_project():
    current_owner= authorize_owner()
    try:
        data = request.json
        print(data)
        new_project = Projects(title=data['title'], description=data['description'], location=data['location'], genre=data['genre'], owner_id=current_owner['id'])
        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    except:
        return {'error': 'Project Could Not Be Created'}, 404

@app.post('/match-page')
def like_project():
    current_user = authorize_user()[0]
    # print(current_user)
    try:
        data = request.json
        project = Projects.query.get(data['project_id'])
        match_user = MatchedUsers(user_id=current_user.id, project_id=project.id) 
        # print(current_user.id)   
        db.session.add(match_user)
        db.session.commit()
        return match_user.to_dict()
    except:
        return {'error': 'Project Not Found'}, 404



# region DELETE ROUTES
@app.delete('/projects/delete/<int:id>')
def delete_project(id):
    current_owner = authorize_owner()
    project = Projects.query.get(id)
    if project.owner_id == session['user']['id']:
        print(project, session['user'], current_owner)
        db.session.delete(project)
        db.session.commit()
        return {"message": 'Project Deleted'}, 200
    elif project.owner_id != session['user']['id']:
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

@app.get('/projects/matches')
def get_matches():
    current_user = authorize_user()
    print(current_user)
    # try:
    matches = MatchedUsers.query.filter(MatchedUsers.user_id == current_user[0].id).all()
    print(matches)
    return {'matches': [match.to_dict() for match in matches]}
    # except:
    #     return {'error': 'Matches Not Found'}, 404

@app.get('/owners/matches')
def get_owner_matches():
    current_owner = authorize_owner()
    print(current_owner)
    owner_projects= current_owner[0].projects
    users_on_projects = [project.users for project in owner_projects]
    flattened_list = [user for sublist in users_on_projects for user in sublist]
    #list of users 

    # try:
  
    # return {'matches': [match.to_dict() for match in matches]}
    # except:
    #     return {'error': 'Matches Not Found'}, 404









if __name__ == '__main__':
    app.run(port=5555, debug=True)
