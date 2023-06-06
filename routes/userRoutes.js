const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post('/submit', userController.addUserDetails);

router.delete('/:productId', userController.deleteUserDetail);

router.use('/', userController.getUserDetails);





module.exports = router;