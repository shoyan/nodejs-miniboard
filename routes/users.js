const express = require('express');
const router = express.Router();
const db = require('../models/index');

/* GET users listing. */
router.get('/',(req, res, next)=> {
  db.User.findAll().then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  });
});

router.get('/:userId', (req, res) => {
  const id = req.query.userId;
  db.User.findByPk(id).then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  });
})

module.exports = router;