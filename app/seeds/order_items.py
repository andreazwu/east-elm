from app.models import db, Order_item, environment, SCHEMA


def seed_order_items():
  demo_order_items = [
    Order_item(order_id=1, product_id=2, product_name="Balboa Upholstered Swivel Armchair", product_price=1099, image_url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202250/0003/balboa-upholstered-swivel-armchair-z.jpg", quantity=1),
    Order_item(order_id=1, product_id=3, product_name="Sausalito Cane Armoire", product_price=2299, image_url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/1200/sausalito-cane-armoire-z.jpg", quantity=1),
    Order_item(order_id=1, product_id=20, product_name="Pre-Lit Flocked Vermont Spruce Faux Christmas Tree", product_price=999, image_url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202235/0322/pre-lit-flocked-vermont-spruce-artificial-christmas-tree-7-1-z.jpg", quantity=1),
    Order_item(order_id=2, product_id=8, product_name="Pomona Indoor/Outdoor Concrete C-Table", product_price=319, image_url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202232/0011/pomona-indoor-outdoor-17-concrete-c-table-xl.jpg", quantity=1),
    Order_item(order_id=2, product_id=11, product_name="Belgian Flax Linen Contrast Flange Duvet Cover", product_price=219, image_url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202249/0096/belgian-flax-linen-contrast-flange-duvet-cover-z.jpg", quantity=1),
    Order_item(order_id=3, product_id=16, product_name="Theo Striped Pillow Cover", product_price=42, image_url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202249/0015/theo-striped-pillow-cover-z.jpg", quantity=1),
  ]

  for order_item in demo_order_items:
    db.session.add(order_item)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the order_items table. SQLAlchemy doesn"t
# have a built in function to do this. With postgres in orderion TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_order_items():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM order_items")

  db.session.commit()
