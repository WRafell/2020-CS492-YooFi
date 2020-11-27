var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('cam', { title: 'Tagdd' });
  console.log('This is setting.js');
  console.log(res);
  //console.log(res);
  res.render('setting', { title: 'setting' });

});


module.exports = router;