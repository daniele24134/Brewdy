require('dotenv').config();
const { sequelize, User, Post } = require('./models');
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3000;


const app = express();


app.use(cors());
app.use(express.json());


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