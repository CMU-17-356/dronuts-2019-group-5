const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/donuts', (_, res) => {
  const donuts = [
    {id: "1", name: "Original Glazed", priceInCents: 100},
    {id: "2", name: "Chocolate Glazed", priceInCents: 150, imageUrl: "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/chocolate_glaze.jpg"},
    {id: "3", name: "Jelly", priceInCents: 200, imageUrl: "https://cmu-17-356.github.io/Dronuts/assets/donut_flavors/jelly.jpg"},
  ];
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(donuts));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
