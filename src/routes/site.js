const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController');

router.post('/store-course', siteController.store)
router.get('/create-course', siteController.create)
router.get('/home', siteController.home);
router.get('/', siteController.index);

module.exports = router;
