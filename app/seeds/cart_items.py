from app.models import db, Cart_item, environment, SCHEMA


def seed_cart_items():
  demo_cart_items = [
    Cart_item(user_id=1, product_id=2, quantity=1),
  ]

  for cart_item in demo_cart_items:
    db.session.add(cart_item)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cart_items table. SQLAlchemy doesn"t
# have a built in function to do this. With postgres in cartion TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cart_items():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM cart_items")

  db.session.commit()
