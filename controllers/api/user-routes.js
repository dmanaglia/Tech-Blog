const router = require('express').Router();
const {User} = require('../../models');

//endpoint /api/users/

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
      // First we find one user record with an email address that matches the one provided by the user logging in
      const userData = await User.findOne({ where: { email: req.body.email } });
      // If an account with that email address doesn't exist, the user will recieve an error message
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email, please try again' });
        return;
      }
      // If the user does exist, we will use the checkPassword() instance method to compare the user's input to the password stored in the record
      const validPassword = await userData.checkPassword(req.body.password);
      // If checkPassword() evaluates as false, the user will receive an error message
      if (!validPassword) {
        res
          .status(400)
          .json({ message: `Incorrect password for ${req.body.email} please try again` });
        return;
      }
      // If checkPassword() evaluates as true, the user will be logged in
      res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
      res.status(400).json(err);
    }
});
  

module.exports = router;