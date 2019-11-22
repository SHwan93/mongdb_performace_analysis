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
    },

    reviews: {
        type: [String]
    }

}, { collection: 'de_post' });
// collection name, schema
module.exports = mongoose.model('de_post', schema);