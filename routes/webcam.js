var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cam', { title: 'tag/standing1',
                      img_file:'/images/standing1.jpg'});
});

module.exports = router;
