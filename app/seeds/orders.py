from app.models import db, Order, environment, SCHEMA


def seed_orders():
  demo_orders = [
    Order(user_id=1),
    Order(user_id=1),
    Order(user_id=1),
  ]

  for order in demo_orders:
    db.session.add(order)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the orders table. SQLAlchemy doesn"t
# have a built in function to do this. With postgres in orderion TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM orders")

  db.session.commit()
