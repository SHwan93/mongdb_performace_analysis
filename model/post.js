var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuidv4 = require('uuid/v4');

var schema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },

    title: {
        type: String,
        required: true,
        unique: true
    },

    category: {
        type: String,
        required: true
    }



}, { collection: 'post' });
// collection name, schema
module.exports = mongoose.model('post', schema);