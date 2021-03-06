const express = require('express');
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('server/dronuts.db')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/donuts', (_, res) => {
  db.all('SELECT * from donuts', [], (err, rows) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows));
  })
});


app.get('/api/donuts/:donutId', (req, res) => {
  db.get(
    'SELECT * FROM donuts where id=?', req.params.donutId,
    function(err, row) {
      if (err) {
        // some unknown SQL error
        console.log(err);
        res.sendStatus(500);
        return;
      }

      if (row === undefined) {
        // query executes successfully but no results
        res.sendStatus(404);
        return;
      }

      // return the found result
      res.send(JSON.stringify(row));
    }
  );
});

app.post('/api/donuts', (req, res) => {
  db.run(
    'INSERT INTO donuts(name, priceInCents, available, display, imageUrl, ingredients) VALUES (?, ?, ?, ?, ?, ?)',
    req.body.name, req.body.priceInCents, req.body.available, req.body.display, req.body.imageUrl, req.body.ingredients,
    function(err) {
      if (err) {
        // probably some schema has been violated, log and return the error
        // this should probably be checked for with Joi,
        //   but I had issues since that is TS and this Express stuff is not
        console.log(err);
        res.status(400).send(err.message)
        return;
      }

      // send back the ID of the newly created donut
      res.send(JSON.stringify({"id": this.lastID}));
    }
  );
});


//query is what is passed in when we call the get requests, params is what is "hard coded" into the get request after "/"
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders WHERE timestamp>? ORDER BY timestamp DESC', req.query.time, [], (err, rows) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows));
  })
});


//use this when creating a new order
app.post('/api/orders', (req, res) => {
  db.run(
    //start with donuts row, id handled automatically
    'INSERT INTO orders(donuts, timestamp, status, droneID, address) VALUES (?, ?, ?, ?, ?)',
    [JSON.stringify(req.body.donuts), req.body.timestamp, req.body.status, req.body.droneID, JSON.stringify(req.body.address)],
    function(err) {
      if (err) {
        // probably some schema has been violated, log and return the error
        // this should probably be checked for with Joi,
        //   but I had issues since that is TS and this Express stuff is not
        console.log(err);
        res.status(400).send(err.message)
        return;
      }

      // send back the ID of the newly created donut
      res.send(JSON.stringify({"id": this.lastID}));
    }
  );
});



app.put('/api/orders/:orderId', (req, res) => {
  console.log('Received a request at' + (new Date).getTime());

  console.log(req.params.orderId);
  console.log(req.body.status);

  const orderStatus = req.body.status;


//use to update an order


  db.run(

    "UPDATE orders SET status=? WHERE id=? ",
    [req.body.status, req.params.orderId],
    function(err) {
      if (err) {
        // some unknown SQL error
        console.log(err);
        res.sendStatus(500);
        return;
      }


      // See https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
      //If execution was successful, the this object will contain two properties named lastID and changes
      console.log(this.changes);

      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify({ 'status': orderStatus }));

      
    }
  );
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
