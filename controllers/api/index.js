const router = require('express').Router();

const postRoutes = require('./post-routes');

router.use('/posts', postRoutes);

module.exports = router;