from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_users = [
        User(first_name="Andrea", last_name="Wu", email="demo@user.io", password="dimidue"),
        User(first_name="Dedue", last_name="Molinaro", email="user2@user.io", password="dimidue"),
        User(first_name="Felix", last_name="Fraldarius", email="user3@user.io", password="dimidue"),
        User(first_name="Sylvain", last_name="Gautier", email="user4@user.io", password="dimidue"),
        User(first_name="Mercedes", last_name="Martritz", email="user5@user.io", password="dimidue"),
        User(first_name="Annette", last_name="Dominic", email="user6@user.io", password="dimidue"),
        User(first_name="Ashe", last_name="Ubert", email="user7@user.io", password="dimidue"),
        User(first_name="Dimitri", last_name="Blaiddyd", email="user8@user.io", password="dimidue"),
    ]

    for user in demo_users:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn"t
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
