const router = require('express').Router();
const {User} = require('../../models');

//endpoint /api/users/

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Unknown username, please try again' });
        return;
      }
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
        res
          .status(400)
          .json({ message: `Incorrect password for ${req.body.username} please try again` });
        return;
      }
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
      res.status(400).json(err);
    }
});

module.exports = router;