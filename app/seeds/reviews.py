from app.models import db, Review, environment, SCHEMA


def seed_reviews():
  demo_reviews = [
    Review(user_id=2, product_id=1, title="Beautiful leather chair", content="Great color. Really a focal point in our bedroom where this chair goes. Love it. Fantastic quality and very comfortable.", stars=5),
    Review(user_id=3, product_id=1, title="Design issues", content="I bought two months ago after 3 months wait and so uncomfortable as all cushions including bottom keep sliding as soon as you sit. Crazy design.", stars=3),
    Review(user_id=4, product_id=1, title="", content="", stars=5),
    Review(user_id=6, product_id=2, title="", content="", stars=5),
    Review(user_id=4, product_id=2, title="Very disappointed", content="I received this couch a couple of weeks ago and am sorely disappointed. I've been a loyal East Elm customer for years so I'm very surprised by this. The couch feels cheaply made, it does not sit correctly and needs to be constantly adjusted, and the seats are uncomfortably squishy and lean back in a strange way. I feel sick that I'm stuck with a couch I'm unhappy with that I paid a lot of money for and waited six months to receive. The only clear positive is that the fabric and color is beautiful. I do not recommend this couch.", stars=2),
    Review(user_id=1, product_id=3, title="This is a beautiful piece. Excellent detail and very functional", content="Bought this piece for additional storage. It's a decent size and cabinet area has ample space. I'd buy it again in a heartbeat.", stars=5),
    Review(user_id=2, product_id=8, title="", content="", stars=4),
    Review(user_id=8, product_id=8, title="Functional", content="Reasonably priced and highly functional.", stars=5),
    Review(user_id=5, product_id=13, title="The most luxurious bath ever", content="It's expensive, but so worth it!", stars=5),
    Review(user_id=6, product_id=13, title="", content="", stars=5),
    Review(user_id=2, product_id=14, title="", content="", stars=3),
    Review(user_id=5, product_id=19, title="", content="", stars=5),
    Review(user_id=2, product_id=20, title="", content="", stars=5),
    Review(user_id=3, product_id=20, title="", content="", stars=2),

  ]

  for review in demo_reviews:
    db.session.add(review)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the reviews table. SQLAlchemy doesn"t
# have a built in function to do this. With postgres in reviewion TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM reviews")

  db.session.commit()
