const express = require('express');
const asyncHandler = require('express-async-handler');
const assignmentController = require('../../../controllers/assignments.controller');
const {
  validateCreateAssignment,
  validateEditAssignment,
} = require('../../../validations/assignment.validation');
const {
  validateAdminToken,
  validateStaffToken,
} = require('../../../middlewares/jwtAuth.middleware');

const router = express.Router();

router.post(
  '/:id/request-for-returning',
  [validateStaffToken],
  asyncHandler(assignmentController.createRequestForReturningHandler)
);

router.post(
  '/',
  [validateAdminToken, validateCreateAssignment],
  asyncHandler(assignmentController.createAssignmentHandler)
);

router.put(
  '/',
  [validateAdminToken, validateEditAssignment],
  asyncHandler(assignmentController.editAssignmentHandler)
);

router.get(
  '/mine',
  [validateStaffToken],
  asyncHandler(assignmentController.getMyAssignmentsHandler)
);

router.get(
  '/find',
  [validateAdminToken],
  asyncHandler(assignmentController.findAssignmentsHandler)
);

router.get('/', [validateAdminToken], asyncHandler(assignmentController.getAllHandler));

router.get('/:id', [validateAdminToken], asyncHandler(assignmentController.getAssignmentHandler));

router.delete(
  '/:id',
  [validateAdminToken],
  asyncHandler(assignmentController.deleteAssignmentHandler)
);

router.patch(
  '/changeStatus/:id',
  [validateStaffToken],
  asyncHandler(assignmentController.changeStatus)
);

router.post(
  '/:id/complete-returning-request',
  [validateAdminToken],
  asyncHandler(assignmentController.completeReturningRequestHandler)
);

router.post(
  '/:id/cancel-returning-request',
  [validateAdminToken],
  asyncHandler(assignmentController.cancelReturningRequestHandler)
);

module.exports = router;
