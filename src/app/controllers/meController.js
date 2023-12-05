const { multipleMongooseToObject, singleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class meController {
    //[GET] /me/stored-courses
    store(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render("me/storedCourses", {
                    courses: multipleMongooseToObject(courses)
                }))
            .catch(next)
    }
}

module.exports = new meController();
