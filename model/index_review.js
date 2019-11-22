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

    content: {
        type: String,
        default: 'this is a sample'
    },

    post: {
        type: String,
        required: true,
        index: true
    }

}, { collection: 'index_review' });
// collection name, schema
module.exports = mongoose.model('index_review', schema);