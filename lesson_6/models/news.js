const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const news = new Schema({
    text: {type: Array, required: true},
    user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('News', news, 'news');