const router = require('express').Router();

const petRoutes = require('./pet-routes')
router.use('/pets', petRoutes)


const postRoutes = require('./post-routes');

router.use('/posts', postRoutes);

module.exports = router;


