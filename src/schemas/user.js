const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  image: {
    type: String,
    unique: true,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  keywords: {
    type: [String]
  },
  source: {
    type: String
  },
  type: {
    type: String
  }
},
{
  timestamps: {}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;