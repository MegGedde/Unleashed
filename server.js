const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers/')
const path = require('path');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({ helpers });

// IMAGES
// store uploaded images middleware
const multer = require('multer')
const upload = multer({ dest: './uploads' })
const { uploadFile } = require('./s3')

const sess = {
  secret: 'Super Secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// Turn on routes
app.use(routes);

// Starts Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening on http://localhost:3001/'));
});