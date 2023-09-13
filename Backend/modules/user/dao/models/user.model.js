var mongoose = require('mongoose');

var UserModel = require('../schemas/user.schema');
module.exports = mongoose.model('User', UserModel); 