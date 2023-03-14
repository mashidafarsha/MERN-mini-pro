const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
   
  },
  phone: {
    type: Number,
    required: [true, "Phone name is required"],

  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    trim: true,
    required: [true, "password is required"],
    minlength: [3],
  },
  image: {
    type: Object,
  }

})
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);

})
module.exports = mongoose.model("User", userSchema)
