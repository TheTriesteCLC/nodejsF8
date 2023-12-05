const { multipleMongooseToObject } = require('../../util/mongoose');
const Course = require('../models/Course');

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

    //[POST] /store-course
    store(req, res) {
        const formData = req.body;
        formData.videoID = formData.videoID.split('/watch?v=')[1] ? formData.videoID.split('/watch?v=')[1] : 'dQw4w9WgXcQ';
        formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        const newCourse = new Course(formData);
        newCourse.save()
            .then(() => res.redirect('/'))
            .catch(error => {

            });
    }
}

module.exports = new siteController();
