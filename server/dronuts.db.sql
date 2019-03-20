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
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (9,'{"Original Glazed":1}',1553013407288,'Delivered','45','{"lat":40.444662,"lng":-79.943374}');
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (10,'{"Original Glazed":1,"Chocolate Glazed":1,"Jelly":1}',1553013635112,'Delivered','46
','{"lat":40.444662,"lng":-79.943374}');
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (11,'{"Chocolate Glazed":2}',1553014502137,'Delivered','45','{"lat":40.444662,"lng":-79.943374}');
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (12,'{"Original Glazed":3}',1553014615853,'Delivered','46','{"lat":40.444662,"lng":-79.943374}');
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (13,'{"Original Glazed":1}',1553014782713,'Delivered','45','{"lat":40.444662,"lng":-79.943374}');
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (14,'{"Original Glazed":2}',1553014874210,'Delivered','45','{"lat":40.444402,"lng":-79.941521}');
INSERT INTO "orders" ("id","donuts","timestamp","status","droneID","address") VALUES (15,'{"Original Glazed":12}',1553014998486,'Delivered','45','{"lat":40.444402,"lng":-79.941521}');
INSERT INTO "donuts" ("id","name","priceInCents","available","display","imageUrl","ingredients") VALUES (1,'Original Glazed',100,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg',NULL);
INSERT INTO "donuts" ("id","name","priceInCents","available","display","imageUrl","ingredients") VALUES (2,'Chocolate Glazed',150,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg',NULL);
INSERT INTO "donuts" ("id","name","priceInCents","available","display","imageUrl","ingredients") VALUES (3,'Jelly',200,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg',NULL);
COMMIT;
