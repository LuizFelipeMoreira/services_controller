const express = require('express');
const router = express.Router();
const useController = require('../controllers/userControllers');

router.post('/create', useController.createUser);
router.post('/edit/:id', useController.editUser);
router.post('/delete/:id', useController.deleteUser);

module.exports = router;
