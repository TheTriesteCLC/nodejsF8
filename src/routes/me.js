const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');

router.get('/stored-courses', meController.store);
router.get('/trash/course', meController.trashCourse);

module.exports = router;
