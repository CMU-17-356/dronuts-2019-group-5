BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "donuts" (
	"id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT NOT NULL UNIQUE,
	"priceInCents"	INTEGER NOT NULL,
	"available"	INTEGER DEFAULT 1,
	"display"	INTEGER DEFAULT 1,
	"imageUrl"	TEXT DEFAULT "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg",
	"ingredients"	TEXT
);
INSERT INTO "donuts" ("id","name","priceInCents","available","display","imageUrl","ingredients") VALUES (1,'Original Glazed',100,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/original_glaze.jpg',NULL);
INSERT INTO "donuts" ("id","name","priceInCents","available","display","imageUrl","ingredients") VALUES (2,'Chocolate Glazed',150,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg',NULL);
INSERT INTO "donuts" ("id","name","priceInCents","available","display","imageUrl","ingredients") VALUES (3,'Jelly',200,1,1,'https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg',NULL);

CREATE TABLE IF NOT EXISTS "orders" (
    "id"    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "donuts"  TEXT NOT NULL UNIQUE,
    "count"  INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "droneID"   TEXT NOT NULL,
    "battery" TEXT NOT NULL,
);
INSERT INTO "orders" ("id","donuts","count","status","droneID","battery") VALUES (1,"Original Glazed",1,"Incoming","XHFBE","99%");
INSERT INTO "orders" ("id","donuts","count","status","droneID","battery") VALUES (2,"Chocolate Glazed",3,"In progress","XHYBE","80%");
INSERT INTO "orders" ("id","donuts","count","status","droneID","battery") VALUES (3,"Original Glazed",5,"Incoming","XLFBE","78%");
COMMIT;
