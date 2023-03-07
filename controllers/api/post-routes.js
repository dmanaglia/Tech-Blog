const router = require('express').Router();
const {Post} = require('../../models');

//endpoint /api/posts/

router.post('/', async (req, res) => {
    try {
      const postData = await Post.create(req.body);
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;