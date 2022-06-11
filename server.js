const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers/')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});