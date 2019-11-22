var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuidv4 = require('uuid/v4');

var schema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },

    content: {
        type: String,
        default: 'this is a sample'
    },

    post: {
        type: String,
        required: true
    }

}, { collection: 'review' });
// collection name, schema
module.exports = mongoose.model('review', schema);