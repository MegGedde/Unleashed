const router = require('express').Router();
const { Comment } = require('./../models/Comment');
const {restore} = require('../../models/Comment');

// the `/api/comments` endpoint 

router.get('/', (req, res) => {
    // find all comments
    // be sure comments are associated with post
    Comment.findAll ({
        attributes: ['id', ''],
        instance: [
            {
                
            }
        ]
    })
})