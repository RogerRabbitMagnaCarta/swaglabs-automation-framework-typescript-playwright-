DROP TABLE IF EXISTS users;
CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  locked   INTEGER NOT NULL DEFAULT 0
);

DROP TABLE IF EXISTS inventory;
CREATE TABLE inventory (
  name        TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  price       REAL NOT NULL,
  image_path  TEXT NOT NULL
);

-- users
INSERT INTO users (username, password, locked) VALUES
  ('standard_user','secret_sauce',0),
  ('locked_out_user','secret_sauce',1),
  ('problem_user','secret_sauce',0),
  ('performance_glitch_user','secret_sauce',0);

-- inventory
INSERT INTO inventory (name, description, price, image_path) VALUES
  ('Sauce Labs Backpack',
   'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
   29.99,
   'sauce-backpack-1200x1500.jpg'
  ),
  ('Sauce Labs Bike Light',
   'A red light isn’t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.',
   9.99,
   'bike-light-1200x1500.jpg'
  ),
  ('Sauce Labs Bolt T-Shirt',
   'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
   15.99,
   'bolt-shirt-1200x1500.jpg'
  ),
  ('Sauce Labs Fleece Jacket',
   'It’s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.',
   49.99,
   'sauce-pullover-1200x1500.jpg'
  ),
  ('Sauce Labs Onesie',
   'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won’t unravel.',
   7.99,
   'red-onesie-1200x1500.jpg'
  ),
  ('Test.allTheThings() T-Shirt (Red)',
   'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
   15.99,
   'red-tatt-1200x1500.jpg'
  );
