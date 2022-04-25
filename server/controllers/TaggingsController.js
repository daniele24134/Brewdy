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

const destroy = async (req, res) => {
  try {
    const { BeerId, PubId } = req.params;
    const tag = await Tagging.findOne({where: {BeerId, PubId}});
    await tag.destroy();
    res.send(tag);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}


module.exports = { create, destroy };