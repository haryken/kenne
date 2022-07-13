const express = require('express');
const asyncHandler = require('express-async-handler');
const usersController = require('../../../controllers/users.controller');
const {
  validateUserLogin,
  validateCreateUser,
  validateEditUser,
} = require('../../../validations/user.validation');
const { verifyCreateUser, verifyEditUser } = require('../../../middlewares/user.middleware');
const {
  validateAdminToken,
  validateStaffToken,
} = require('../../../middlewares/jwtAuth.middleware');

const router = express.Router();

router.get('/list', [validateAdminToken], asyncHandler(usersController.getListUser));

router.post('/login', validateUserLogin, asyncHandler(usersController.userLoginHandler));
router.post(
  '/',
  [validateAdminToken, validateCreateUser, verifyCreateUser],
  asyncHandler(usersController.createUserHandler)
);

router.put(
  '/',
  [validateAdminToken, validateEditUser, verifyEditUser],
  asyncHandler(usersController.editUserHandler)
);

router.get('/:id', [validateAdminToken], asyncHandler(usersController.getUserHandler));

router.patch(
  '/change-password',
  validateStaffToken,
  asyncHandler(usersController.userChangePasswordHandler)
);

router.get(
  '/check/:id',
  [validateAdminToken],
  asyncHandler(usersController.checkDeleteUserHandler)
);

router.put('/:id/disable', [validateAdminToken], asyncHandler(usersController.disableUserHandler));

module.exports = router;
