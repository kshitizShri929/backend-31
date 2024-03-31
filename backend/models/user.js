/*const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
*/
// Assuming you're using a MongoDB database with Mongoose

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String    },
    password: {
        type: String },
    passwordResetOTP: String,//change
    passwordResetExpiry: Date, //   
    
      
});

module.exports = mongoose.model('User', userSchema);
