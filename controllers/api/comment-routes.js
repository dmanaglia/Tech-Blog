const router = require('express').Router();
const {Comment} = require('../../models');
const parseDate = require('../../utils/helpers')

//endpoint /api/comments/

router.post('/', async (req, res) => {
  console.log(req.body);
    try {
      const commentData = await Comment.create({
        text: req.body.text,
        user_id: req.session.userId,
        post_id: req.body.post_id,
        posted_on: parseDate()
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;