const express = require('express');
const postsApiRouter = require('./posts.api');
const assetsApiRouter = require('./assets.api');
const categoriesApiRouter = require('./categories.api');
const usersApiRouter = require('./users.api');
const assignmentRouter = require('./assignments.api');
const reportRouter = require('./reports.api');

const router = express.Router();

router.use('/categories', categoriesApiRouter);
router.use('/posts', postsApiRouter);
router.use('/assets', assetsApiRouter);

router.use('/users', usersApiRouter);

router.use('/assignments', assignmentRouter);
router.use('/reports', reportRouter);

module.exports = router;
