const router = require('express').Router();
const postRoutes = require('./post-routes');
const petRoutes = require('./pet-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');

router.use('/pets', petRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;


