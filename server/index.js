require('dotenv').config();
const { sequelize, User, Post } = require('./models');
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3003;
const SECRET = process.env.SECRET_KEY || 'cat';
const router = require('./router');
const session = require('express-session');

const app = express();
const corsConfig = {
  credentials: true,
  // origin: 'http://localhost:3000'
};

app.use(cors(corsConfig));

app.use(express.json());
app.use(session({
  name: 'sid',
  saveUninitialized: false,
  resave: false,
  secret: SECRET,
  cookie: {
    maxAge: 3000 * 60 * 60, //3hr
    sameSite: true
  },
}));


app.use(router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected!!')

    app.listen(PORT, async () => {
      console.log('Server is up on http://localhost:'+PORT);
    })
  } catch (error) {
    console.error(error)
  }

})()