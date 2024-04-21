const { multipleMongooseToObject, singleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

class meController {
    //[GET] /me/stored-courses
    async store(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, delCount]) => {
                res.render("me/storedCourses", {
                    courses: multipleMongooseToObject(courses),
                    delCount
                });
            })
            .catch(next)
    }

    //[GET] /me/trash/course
    async trashCourse(req, res, next) {
        const storedCount = await Course.countDocuments();

        Course.findWithDeleted({ deleted: true })
            .then((courses) =>
                res.render("me/trashCourses", {
                    courses: multipleMongooseToObject(courses),
                    storedCount
                }))
            .catch(next)
    }
}

module.exports = new meController();
