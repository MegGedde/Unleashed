const router = require('express').Router();
const { Comments } = require('./../models/Comments');
const {restore} = require('../../models/Comments');

// the `/api/comments` endpoint 

router.get('/', (req, res) => {
    // find all comments
    // be sure comments are associated with post
    Comments.findAll ({
        attributes: ['id', ''],
        instance: [
            {
                
            }
        ]
    })
})