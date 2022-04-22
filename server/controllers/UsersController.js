const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const show = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findByPk(id, {include: 'beers'});
    
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const create = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    if (password.length < 6) throw new Error('passwrod must be at least 6 characters');
    
    const passwordDigest = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, password: passwordDigest });
    res.send({ id: user.id, username: user.username, email: user.email, beers: [] });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({where:{ email }, include: 'beers'});

    if (user) {
      const result = await bcrypt.compare(password, user.password);
      try {
        if (result) {
          res.send({id:user.id, username:user.username, email:user.email, beers: user.beers});
        } else {
          throw new Error('email/passoword incorrect');
        }
      } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
      }
    } else throw new Error('email/passoword incorrect');
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
  }
}

module.exports = {login, show, create}