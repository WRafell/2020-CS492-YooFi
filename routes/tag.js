var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('cam', { title: 'Tagdd' });
  console.log('This is tag.js');
  console.log(res);
  //console.log(res);
  res.render('cam', { title: 'NEW' ,
                      co_value: res.filename,
                      img_file: res.file,
                      js_file:'/javascripts/pose_estimator.js'});

});

router.get('/asana1', function(req, res, next) {
  res.render('cam', { title: 'tag/anana1~' ,
                      co_value: '/images/asana1.jpg',
                      img_file: '/images/asana1.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});


router.get('/downdog', function(req, res, next) {
  res.render('cam', { title: 'tag/downdog',
                      co_value: '/images/downdog.jpg',
                      img_file:'/images/downdog.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/standing1', function(req, res, next) {
  res.render('cam', { title: 'tag/standing1',
                      co_value: '/images/standing1.jpg',
                      img_file:'/images/standing1.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/standing2', function(req, res, next) {
  res.render('cam', { title: 'tag/standing2',
                      co_value: '/images/standing2.jpg',
                      img_file:'/images/standing2.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/standing3', function(req, res, next) {
  res.render('cam', { title: 'tag/standing3',
                      co_value: '/images/standing3.jpg',
                      img_file:'/images/standing3.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/standing4', function(req, res, next) {
  res.render('cam', { title: 'tag/standing4',
                      co_value: '/images/standing4.jpg',
                      img_file:'/images/standing4.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/mountain', function(req, res, next) {
  res.render('cam', { title: 'tag/mountain',
                      co_value: '/images/mountain_pose.jpg',
                      img_file:'/images/mountain_pose.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/tree', function(req, res, next) {
  res.render('cam', { title: 'tag/tree',
                      co_value: '/images/tree_pose.jpg',
                      img_file:'/images/tree_pose.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/triangle', function(req, res, next) {
  res.render('cam', { title: 'tag/triangle',
                      co_value: '/images/triangle_pose.jpg',
                      img_file:'/images/triangle_pose.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/warrior', function(req, res, next) {
  res.render('cam', { title: 'tag/warrior',
                      co_value: '/images/warrior_pose.jpg',
                      img_file:'/images/warrior_pose.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

router.get('/mountain_down', function(req, res, next) {
  res.render('cam', { title: 'tag/mountain_down',
                      co_value: '/images/mountain_pose_down.jpg',
                      img_file:'/images/mountain_pose_down.jpg',
                      js_file:'/javascripts/pose_estimator.js'});
});

module.exports = router;