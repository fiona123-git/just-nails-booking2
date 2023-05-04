const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// create user schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // email for each user should be unique
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // to make sure the user not an admin
    },
  },
  {
    timestamps: true,
  }
)
// auth the passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
// adding middleware before its saved
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
    // if password is not modified then  it would move to the next step.
  }
// encrypt password  using asyn methodo
  const salt = await bcrypt.genSalt(10)
  //setting user password to b hashed 
  this.password = await bcrypt.hash(this.password, salt)
})
module.exports = mongoose.model('User', userSchema)
