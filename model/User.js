const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },
    age: { type: Number },
  });

  const User=new mongoose.model('User',userSchema);

module.exports=User;