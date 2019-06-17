const Post = require('../models/post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
   
  async index(req, res) {
    try {
      const posts = await Post.find().sort('-createdAt')
      .limit(5).exec((e, msg) => {
        console.log(' s ', e);
        console.log(' msg ', msg);
      });
      return res.json(posts);
    } catch (e) {
      console.log(' 4 ', e);
      
    }   
  },

  async store(req, res) {
    try {
      const { author, place, description, hashtags } = req.body;
      const { filename: image } = req.file;
      const [name] = image.split('.');
      const fileName = `${name}.jpg`;

      // tratando a imagem com sharp
      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', fileName));
      //delete image with file-system
      fs.unlinkSync(req.file.path);

      const post = await Post.create({
        author,
        place,
        description,
        hashtags,
        image: fileName
      }, (e) => console.log(' erro postcontroller ', e.error));
      req.io.emit('post', post);
      return res.json(post);
    } catch (error) {
      console.log(' error ', error)
    }
   
  }
};