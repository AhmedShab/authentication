const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({	"email" : { type: String, unique: ture, lowercase: ture },	"password" : String});

module.exports = mongoose.model('user', userSchema);
