const {Router}=require('express');
const {handleSignIn,handleSignUp,handleUserSignUpDetails,handleUserSignIn, userLogout}=require('../controllers/user')

const router=Router();

router.get('/signin',handleSignIn);

router.get('/signup',handleSignUp);

router.post('/signup',handleUserSignUpDetails);

router.post('/signin',handleUserSignIn);

router.get('/logout',userLogout);

module.exports=router;