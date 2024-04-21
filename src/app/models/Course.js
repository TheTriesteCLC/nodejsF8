const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    _id: { type: Number, },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    users: { type: Number, required: true },
    slug: { type: String, slug: 'name', unique: true },
    videoID: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    // }, {
    //     timestamps: true,
    // 
},
    {
        _id: false,
        timestamps: true
    });

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});

module.exports = mongoose.model('Course', Course);