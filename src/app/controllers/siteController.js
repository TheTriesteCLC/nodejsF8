const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');
const slugify = require('slugify');

class siteController {
    //[GET] /
    index(req, res) {
        res.render('home');
    }

    //[GET] /home
    home(req, res) {
        res.render('home');
    }

    //[GET] /create
    create(req, res) {
        res.render('create');
    }

    //[GET] /update
    update(req, res) {
        Course.findOne({ slug: req.params.slug }).lean()
            .then(async course => {
                res.render('update', { course });
            });
    }

    //[POST] /store-course
    store(req, res) {
        const formData = req.body;
        formData.videoID = formData.videoID.split('/watch?v=')[1] ? formData.videoID.split('/watch?v=')[1] : 'dQw4w9WgXcQ';
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        const newCourse = new Course(formData);
        newCourse.save()
            .then(() => res.redirect('back'))
            .catch(error => {

            });
    }

    //[POST] /update-course/:slug
    updateCourse(req, res) {
        const formData = req.body;
        formData.videoID = formData.videoID.split('/watch?v=')[1] ? formData.videoID.split('/watch?v=')[1] : 'dQw4w9WgXcQ';
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                console.log(course);

                course.name = formData.name;
                course.description = formData.description;
                course.image = formData.image;
                course.users = formData.users;
                course.videoID = formData.videoID;
                course.save()
                    .then(() => res.redirect('/me/stored-courses'))
            })

    }

    //[POST] /restore-course/:id
    restoreCourse(req, res) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
    }

    //[POST] /delete-course/:id
    deleteCourse(req, res) {
        Course.delete({ _id: req.params.id })
            .then(result => res.redirect('/me/stored-courses'))
    }

    //[POST] /delete-permanent-course/:id
    deletePermanentCourse(req, res) {
        Course.deleteOne({ _id: req.params.id })
            .then(result => res.redirect('/me/trash/course'))
    }

    //[POST] /handle-course-form-actions
    handleFormAction(req, res) {
        const formData = req.body;

        switch (formData.action) {
            case 'delete':
                Course.delete({ _id: { $in: formData.courseIDs } })
                    .then(result => res.redirect('/me/stored-courses'))
                break;
            default:
                res.json(req.body);
        }
    }
}

module.exports = new siteController();
