const { multipleMongooseToObject, singleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class courseController {
    //[GET] /
    index(req, res) {
        Course.find({})
            .then(courses => {
                res.render('courses', { courses: multipleMongooseToObject(courses) });
            })
            .catch(error => next(error));
    }

    //[GET] /courses/:slug
    show(req, res) {
        Course.findOne({ slug: req.params.slug })
            .then(courses => {
                res.render('courses/show', { courses: singleMongooseToObject(courses) });
            })
            .catch(error => next(error));
    }
}

module.exports = new courseController();
