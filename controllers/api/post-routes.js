const router = require('express').Router();
const {Post} = require('../../models');
const parseDate = require('../../utils/helpers')

//endpoint /api/posts/

//create new post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.userId,
      posted_on: parseDate()
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
        posted_on: parseDate()
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;