const {Router}=require('express');
const {addBlogs,uploadBlogs,getUserBlogDetails}=require('../controllers/blog')
const multer=require('multer');
const path=require('path');
const router=Router();

const storage = multer.diskStorage({
 
  destination: function (req, file, cb) {
  cb(null, path.resolve('./public/uploads'));
},

  filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`;
    cb(null,fileName);
  }
})

const upload = multer({ storage: storage });

router.get('/addblog',addBlogs);

router.get('/:id',getUserBlogDetails);

router.post('/',upload.single("coverImg"),uploadBlogs);

module.exports=router;