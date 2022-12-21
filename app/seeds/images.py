from app.models import db, Image, environment, SCHEMA


def seed_images():
  demo_images = [
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/0788/malibu-leather-accent-chair-z.jpg", product_id=1),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/0731/malibu-leather-accent-chair-z.jpg", product_id=1),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/0800/malibu-leather-accent-chair-z.jpg", product_id=1),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202250/0003/balboa-upholstered-swivel-armchair-z.jpg", product_id=2),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202250/0017/balboa-upholstered-swivel-armchair-z.jpg", product_id=2),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202247/1176/balboa-upholstered-swivel-armchair-z.jpg", product_id=2),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/1200/sausalito-cane-armoire-z.jpg", product_id=3),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/1182/sausalito-cane-armoire-z.jpg", product_id=3),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202232/0130/sausalito-cane-armoire-z.jpg", product_id=3),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202233/0148/ember-upholstered-sofa-xl.jpg", product_id=4),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202233/0143/malibu-18-woven-accent-cube-1-xl.jpg", product_id=4),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202248/0034/cayman-platform-bed-headboard-z.jpg", product_id=5),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202247/0020/folsom-84-grand-console-table-z.jpg", product_id=6),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202231/0046/torrey-all-weather-wicker-chaise-lounge-3-z.jpg", product_id=7),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202232/0011/pomona-indoor-outdoor-17-concrete-c-table-xl.jpg", product_id=8),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202227/0136/torrey-all-weather-wicker-square-arm-lounge-chair-pomona-c-z.jpg", product_id=9),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202238/0687/rustic-forest-duvet-cover-1-z.jpg", product_id=10),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/0090/calistoga-28-nightstand-z.jpg", product_id=10),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202249/0096/belgian-flax-linen-contrast-flange-duvet-cover-z.jpg", product_id=11),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202247/0011/bryce-buffalo-check-cotton-duvet-cover-z.jpg", product_id=12),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202251/0146/holas-72-handcrafted-freestanding-concrete-bathtub-8-xl.jpg", product_id=13),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202250/0255/reed-linen-closet-10-xl.jpg", product_id=14),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202251/0871/everywhere-velvet-pillows-1-xl.jpg", product_id=15),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202249/0015/theo-striped-pillow-cover-z.jpg", product_id=16),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/1007/aubrey-handwoven-basket-collection-natural-xl.jpg", product_id=17),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202234/0741/open-box-beachcomber-handwoven-seagrass-oversized-lidded-b-xl.jpg", product_id=18),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202247/0127/faux-pre-lit-aspen-spruce-wreath-z.jpg", product_id=19),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202235/0322/pre-lit-flocked-vermont-spruce-artificial-christmas-tree-7-1-z.jpg", product_id=20),
    Image(url="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202241/0031/light-up-snowy-twiggy-tree-z.jpg", product_id=21),

  ]

  for image in demo_images:
    db.session.add(image)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the images table. SQLAlchemy doesn"t
# have a built in function to do this. With postgres in imageion TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
  else:
    db.session.execute("DELETE FROM images")

  db.session.commit()
