const { Pub } = require('../models');
const { Tagging } = require('../models');

const index = async (req, res) => {
  try {    
    const { userId } = req.params;
    const pubs = await Pub.findAll({where: { userId }});
    res.send(pubs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

const show = async (req, res) => {
  try {
    const {id} = req.params;
    const pub = await Pub.findByPk(id, {include: 'beers'});
    res.send(pub);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

const create = async (req, res) => {
  try {
    const { name, address, city, userId } = req.body;
    const { beerId } = req.params;
    const pub = await Pub.create({ name, address, city, userId });
    await Tagging.create({ BeerId: beerId, PubId: pub.id});
    res.send(pub);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const pub = await Pub.findByPk(id);
    await pub.destroy;
    await Tagging.destroy({where: {PubId: pub.id}});
    res.send(pub);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

module.exports = {index, show, create, destroy};