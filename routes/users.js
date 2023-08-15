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



router.get('/add',(req, res, next)=> {
  var data = {
    title: 'Users/Add'
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next)=> {
  db.User.create({
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      age: req.body.age
    })
    .then(usr => {
      res.redirect('/users');
    });
});

router.get('/edit',(req, res, next)=> {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'Users/Edit',
      form: usr
    }
    res.render('users/edit', data);
  });
});

router.post('/edit',(req, res, next)=> {
  db.User.update({
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age
  },
  {
    where:{id:req.body.id}
  })
  .then(usr => {
    res.redirect('/users');
  });
});

router.get('/delete',(req, res, next)=> {
  db.User.findByPk(req.query.id)
  .then(usr => {
    var data = {
      title: 'Users/Delete',
      form: usr
    }
    res.render('users/delete', data);
  });
});

router.post('/delete',(req, res, next)=> {
  db.sequelize.sync()
  .then(() => db.User.destroy({
    where:{id:req.body.id}
  }))
  .then(usr => {
    res.redirect('/users');
  });
});

router.get('/:userId', (req, res) => {
  const id = req.query.userId;
  db.User.findByPk(id).then(usrs => {
    var data = {
      title: 'ユーザー詳細画面',
      content: usrs
    }
    res.render('users/index', data);
  });
})
module.exports = router;