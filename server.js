const express = require('express');
const routes = require('./controllers')
const sequelize = require('./config/connection');

const {uploadFile} = require('./s3')


// store uploaded images middleware
const multer  = require('multer')
const upload = multer({ dest: './uploads' })

const path = require('path');
const routes = require('./controllers/')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Turn on routes
app.use(routes)

app.get("/", (req, res) => {
  res.render('index.html')

})

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});