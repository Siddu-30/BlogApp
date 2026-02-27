const {Schema,model}=require('mongoose');
const {createHmac, randomBytes}=require('crypto'); // this is to hash the password, it is a builtin module;
const {createUserToken}=require('../services/authentication');


const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:'/Images/profile.png',
    },
    role:{
        type:String,
        enum:['user','admin'], // basically enum is an array, here it means that we can have only two types of roles.  
        default:'user',
    },
},{timestamps:true});


// so when user tries to save the new user below function is executed first and hashes the password;

userSchema.pre('save',function (next){
    if(!this.isModified('password')) return ;

    const salt=randomBytes(16).toString(); // random string , it is like a secret key
    const hashedPassword=createHmac('sha256',salt) // here salt is key and 'sha256' is an algorithm , and generates hashpassword with salt
    .update(this.password) // this is to update user password
    .digest('hex');

    this.salt=salt;
    this.password=hashedPassword; // this replaces the original password
    next();
});


// this is to check user password

userSchema.static('matchPasswordAndGenerateToken',async function (email,password){
    const user= await this.findOne({email});
    if(!user) throw new Error('user not found!');

    const salt=user.salt;
    const hashedPassword=user.password;

    const userProvidedHash=createHmac('sha256',salt) 
    .update(password) 
    .digest('hex');
    if(hashedPassword!==userProvidedHash) throw new Error('Incorrect Password!');

    const token=createUserToken(user);

    return token;
});


const user=model('user',userSchema);

module.exports=user;