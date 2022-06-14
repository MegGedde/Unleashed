const router = require('express').Router();
const postRoutes = require('./post-routes');
const petRoutes = require('./pet-routes');
const userRoutes = require('./user-routes');

router.use('/pets', petRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);

module.exports = router;


