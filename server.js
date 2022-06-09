const express = require('express');
const routes = require('./controllers')
const sequelize = require('./config/connection');
const {uploadFile} = require('./s3')
const path = require('path')

// store uploaded images middleware
const multer  = require('multer')
const upload = multer({ dest: './uploads' })

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// Turn on routes
app.use(routes)

app.get("/", (req, res) => {
  res.render('index.html')

})

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});