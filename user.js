const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    description: "name of the user",
  },
  
  email: {
    type: String,
    required: true,
    description: "Phone number of the user",
  },
  
  
  password: {
    type: String,
    required: true,
    description: "Password for user",
  },
  confirmPass: {
    type: String,
    required: true,
    description: "Password for user",
  },

  phoneNo:{
    type: String,
    required: true,
    description: "Phone number",
  },
 


});



module.exports = mongoose.model("User", UserSchema);
