const router = require('express').Router();
const {Comment, Post, User} = require('../models');
const withAuth = require('../utils/auth');

//welcome page
router.get('/', async (req, res) => {
  req.session.userId = null;
  req.session.loggedIn = false;
  res.render('welcome');
})

//get all posts
router.get('/home', async (req, res) => {
  try {
    const userId = req.session.userId;
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('home', {
      posts,
      userId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a single post by id
router.get('/post/:postId', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        { model: User }, 
        { model: Comment, as: "comments", include: [{model: User}]}
      ]
    });
    const post = postData.get({ plain: true });
    res.render('post', {post, userId});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//go to user dashboard
router.get('/user/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post, as: 'posts'}]
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

//login page (:login is boolean representing login or signup)
router.get('/login/:login', async (req, res) => {
  const login = req.params.login * 1;
  res.render('login', {login});
});

//add comment page
router.get('/add-comment/:postId', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        { model: User }, 
        { model: Comment, as: "comments", include: [{model: User}]}
      ]
    });
    const post = postData.get({ plain: true });
    res.render('add-comment', {post, userId});  
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//add post page
router.get('/add-post', withAuth, async (req, res) => {
  const userId = req.session.userId;
  res.render('add-post', {userId});
});

//update post page
router.get('/update-post/:postId', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        { model: User }, 
        { model: Comment, as: "comments", include: [{model: User}]}
      ]
    });
    const post = postData.get({ plain: true });
    res.render('update-post', {post, userId});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//authentication error
router.get('/authenticate', async (req, res) => {
  //timeOut is undefined if session has expired and exists if user hasn't signed in yet
  let expired;
  if(req.session.loggedIn === false){
    expired = false;
  } else {
    expired = true;
  }
  res.render('authenticate', {expired});
});

module.exports = router;