const express = require('express');
const router = express.Router();
const useController = require('../controllers/userControllers');

router.post('/create', useController.createUser);

module.exports = router;
