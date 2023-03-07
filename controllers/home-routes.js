const router = require('express').Router();
const {Comment, Post, User} = require('../models');

//get all posts
router.get('/home', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('home', {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a single post by id
router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User }, 
        { model: Comment, as: "comments" }
      ]
    });
    const post = postData.get({ plain: true });
    res.render('post', {post});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a single user by id
router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Post }]
    });
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    const user = userData.get({ plain: true });
    res.render('user', {user});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;