var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuidv4 = require('uuid/v4');

var schema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        index: true
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



}, { collection: 'index_post' });
// collection name, schema
module.exports = mongoose.model('index_post', schema);