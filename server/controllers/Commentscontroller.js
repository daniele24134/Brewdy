const {Comment} = require('../models');

const create = async (req, res) => {
  try {
    const {userId, beerId, body} = req.body;
    const {id} = await Comment.create({ userId, beerId, body });
    const comment = await Comment.findByPk(id, {include: 'user'});
    res.status(201).send(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

const showCommentsByBeer = async (req, res) => {
  try {
    const {beerId} = req.params;
    const comments = await Comment.findAll({where: {beerId}, include: 'user'});
    res.send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

const deleteComment = async (req, res) => {
  try {
    const {userId, id} = req.params;
    const comment = await Comment.findByPk(id);
    if (comment.userId === Number(userId)) {
      await comment.destroy();
      res.send(comment);
    } else {
      res.status(401).send('Not authorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}


module.exports = {create, showCommentsByBeer, deleteComment};