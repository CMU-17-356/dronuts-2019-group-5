BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	INTEGER NOT NULL DEFAULT 1 PRIMARY KEY AUTOINCREMENT,
	"donuts"	TEXT NOT NULL DEFAULT '{"Original Glazed":1}',
	"timestamp"	INTEGER NOT NULL DEFAULT 1552937288,
	"status"	TEXT NOT NULL DEFAULT 'Ordered',
	"droneID"	TEXT NOT NULL DEFAULT 'XKEDFG',
	"address"	TEXT NOT NULL DEFAULT '"location": {
    "lat": 40.44394444,
    "lng": -79.94444444
  }'
);
CREATE TABLE IF NOT EXISTS "donuts" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL UNIQUE,
	"priceInCents"	INTEGER NOT NULL,
	"available"	INTEGER DEFAULT 1,
	"display"	INTEGER DEFAULT 1,
	"imageUrl"	TEXT DEFAULT "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg",
	"ingredients"	TEXT
);
INSERT INTO "orders" VALUES (1,'''{"Original Glazed":2}''',1552937299000,'Accepted','XKEDFY','"location": {
    "lat": 40.44394444,
    "lng": -79.94444444
  }');
INSERT INTO "orders" VALUES (2,'''{"Chocolate Glazed":3}''',1552937499000,'Delivered','XLEBFG','"location": {
    "lat": 40.44394444,
    "lng": -79.94444444
  }');
INSERT INTO "orders" VALUES (3,'''{"Original Glazed":3}''',1552937399000,'Ordered','XKEDHI','"location": {
    "lat": 40.44394444,
    "lng": -79.94444444
  }');
INSERT INTO "orders" VALUES (4,'''{"Original Glazed":5}''',1552937799000,'Dispatched','XKEDFG','"location": {
    "lat": 40.44394444,
    "lng": -79.94444444
  }');
INSERT INTO "donuts" VALUES (1,'Original Glazed',100,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg',NULL);
INSERT INTO "donuts" VALUES (2,'Chocolate Glazed',150,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg',NULL);
INSERT INTO "donuts" VALUES (3,'Jelly',200,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg',NULL);
COMMIT;
