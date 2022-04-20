const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const show = async (req, res) => {
  try {
    const {id} = req.session.sid;
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
    const passwordDigest = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, email, password: passwordDigest });
    req.session.sid = user.id;
    res.send(user);

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
      const result = bcrypt.compare(password, user.password);
      try {
        if (result) {
          req.session.sid = user.id;
          res.send(user);
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