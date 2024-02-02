const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

router.post('/store-course', siteController.store)
router.post('/update-course/:slug', siteController.updateCourse);
router.post('/restore-course/:id', siteController.restoreCourse);
router.post('/delete-course/:id', siteController.deleteCourse);
router.post('/delete-permanent-course/:id', siteController.deletePermanentCourse);
router.post('/handle-course-form-actions', siteController.handleFormAction);

router.get('/create-course', siteController.create);
router.get('/update-course/:slug', siteController.update);
router.get('/home', siteController.home);
router.get('/', siteController.index);

module.exports = router;
