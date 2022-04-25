const { Tagging } = require('../models');

const create = async (req, res) => {
  try {
    const { BeerId, PubId } = req.body;
    const tag = await Tagging.create({ BeerId, PubId });
    res.send(tag);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};


module.exports = { create };