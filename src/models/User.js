const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../auth/GenerateTokens');
const getUserInfo=require('../lib/getUserInfo')
const Token=require('./token')
const taskSchema = new mongoose.Schema({
    id_task: String,
    date: String,
    description: String,
});
const UserSchema = new mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    task: [taskSchema],
});
UserSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});
UserSchema.methods.userNameExist = async function(username) {
    const result = await mongoose.model('User').findOne({ user_name: username });
    return !!result;
};
UserSchema.methods.comparePassword = async function(password, hash) {
    const same = await bcrypt.compare(password, hash);
    return same;
};
UserSchema.methods.createAccessToken=async function(){
    return generateAccessToken(getUserInfo(this))
}
UserSchema.methods.createRefreshToken=async function(){
    const refreshToken=generateRefreshToken(getUserInfo(this))
    try{
        await new Token({token:refreshToken}).save()
        return refreshToken
    }catch(err){
        console.log(err)
    }
}
const User = mongoose.model("User", UserSchema);
module.exports = User;