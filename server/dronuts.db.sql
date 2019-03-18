BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	INTEGER NOT NULL DEFAULT 1 PRIMARY KEY AUTOINCREMENT,
	"donuts"	TEXT NOT NULL DEFAULT 'Chocoloate glazed',
	"count"	INTEGER NOT NULL DEFAULT 1,
	"status"	TEXT NOT NULL DEFAULT 'In Progress',
	"droneID"	TEXT NOT NULL DEFAULT 'XKEDFG',
	"batteryLevel"	TEXT NOT NULL DEFAULT '100%'
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
INSERT INTO "orders" VALUES (1,'Original Glazed',1,'In Progress','XKEDFY','80%');
INSERT INTO "orders" VALUES (2,'Chocoloate glazed',3,'Delivered','XLEBFG','100%');
INSERT INTO "orders" VALUES (3,'Chocoloate glazed',1,'Incoming','XKEDHI','99%');
INSERT INTO "donuts" VALUES (1,'Original Glazed',100,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg',NULL);
INSERT INTO "donuts" VALUES (2,'Chocolate Glazed',150,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg',NULL);
INSERT INTO "donuts" VALUES (3,'Jelly',200,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg',NULL);
COMMIT;
