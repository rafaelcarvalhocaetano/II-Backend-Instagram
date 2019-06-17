// @ts-nocheck
const Like = require('../models/post');

module.exports = {
  async store(req, res) {
    try {
      const like = await Like.findById(req.params.id);
      like.likes += 1;
      await like.save();
      req.io.emit('like', like);
      return res.json(like);
    } catch (e) {
      console.log(' asd 1', e);
      throw new Error(' aqui novo erro 1 ', e);
    }
   
  }
}