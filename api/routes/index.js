const express = require("express");
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


router.post(`/register`, (req, res) => {
  User.findOne({where: {email : req.body.email}})
    .then(user => {
      if (user) res.status(400).send(`User already exist`)
      else {
        User.create(req.body)
          .then(data => res.send(data));
      }
    })
});

router.post(`/login`, passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

router.post(`/logout`, (req, res) => {
  req.logOut();
  res.send(req.user);
});

router.get(`/me`, (req, res) => {
  if(req.user) res.send(req.user);
  else res.sendStatus(401);
});

router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;