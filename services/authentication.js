const JWT=require('jsonwebtoken');

const secret="BloggingApp";

function createUserToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    };
    const token=JWT.sign(payload,secret);
    return token;
};

function validateUserToken(token){
    const payload=JWT.verify(token,secret);
    return payload;
};

module.exports={
    createUserToken,
    validateUserToken,
};

