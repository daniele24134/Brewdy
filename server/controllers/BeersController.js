const {Beer} = require('../models');

const create = async (req, res) => {
  try {
    const {userId} = req.params;
    const {name, counter, tagline, abv, ibu, wish, image_url,bid } = req.body;
    const beer = await Beer.create({ name, counter, tagline, abv, ibu, wish, image_url, userId, bid });
    res.send(beer);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const destroy = async (req, res) => {
  try {
    const {id} = req.params;
    const beer = await Beer.findByPk(id);
    await beer.destroy();
    res.send(beer);

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}



const increment = async (req, res) => {
  try {
    const {id} = req.params;
    await Beer.increment({ counter: 1}, { where: { id } });
    const beer = await Beer.findByPk(id);
    res.send(beer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const decrement = async (req, res) => {
  try {
    const { id } = req.params;
    await Beer.increment({ counter: -1 }, { where: { id } });
    const beer = await Beer.findByPk(id);
    res.send(beer);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {create, destroy, increment, decrement};