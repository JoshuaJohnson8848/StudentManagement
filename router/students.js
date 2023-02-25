const express = require('express');
const router = express.Router();

const studentController = require('../controller/students');

router.post('/', studentController.create);

module.exports = router;
