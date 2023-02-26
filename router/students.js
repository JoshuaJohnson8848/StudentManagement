const express = require('express');
const router = express.Router();

const studentController = require('../controller/students');

router.post('/', studentController.create);

router.get('/', studentController.getAll);

router.put('/:id', studentController.update);

module.exports = router;
