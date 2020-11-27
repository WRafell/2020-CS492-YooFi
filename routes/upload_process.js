var express = require('express');
var app = express();
var router = express.Router();

var tagRouter = require('./tag');
var indexRouter = require('./index');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename:function(req,file, cb){
    cb(null,file.originalname)
  }
});
var upload = multer({storage : storage});
var img_name = '';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('upload_page');
});

router.post('/upload',upload.single('userfile'), function(req, res, next) {
  console.log(req.file);
  console.log(req.file.path);
  img_name =  '/uploads/'+req.file.originalname
  res.render('upload_page', { img_file: '/uploads/'+req.file.originalname });
});



router.get('/new_img', function(req, res, next) {
  res.render('cam', { title: 'Do your own yoga pose',
                      img_file:img_name,
                      js_file:'/javascripts/pose_estimator.js'
                    });

});


//app.use('/home', indexRouter);

//router.get('/home', function(req, res, next) {
//  res.render('index');
//});





module.exports = router;
