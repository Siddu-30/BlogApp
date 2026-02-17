const user=require('../models/user')


function handleSignIn(req,res){
    return res.render('signin');
};

function handleSignUp(req,res){
    return res.render('signup');
};

async function handleUserSignUpDetails(req,res) {
    const { username,email,password }=req.body;
    await user.create({
        username,
        email,
        password,
    });
    return res.redirect('signin');
};

async function handleUserSignIn(req,res){
    const {email,password}=req.body;

    try {
        const token= await user.matchPasswordAndGenerateToken(email,password); // to check the password user provided

    return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin',{
            error:"Incorrect Email or Password",
        });

    }
}

function userLogout(req,res){
    return res.clearCookie('token').redirect('/');
};

module.exports={
    handleSignIn,
    handleSignUp,
    handleUserSignUpDetails,
    handleUserSignIn,
    userLogout,
}