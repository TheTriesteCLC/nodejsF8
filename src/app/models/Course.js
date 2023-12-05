const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    users: { type: String, required: true },
    slug: { type: String, slug: 'name', unique: true },
    videoID: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    // }, {
    //     timestamps: true,
    // 
});

module.exports = mongoose.model('Course', Course);