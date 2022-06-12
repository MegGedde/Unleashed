const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Pet } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
            include: [
              {
                model: Pet,
                attributes: ['pet_name', 'species', 'breed', 'color', 'photo']
              },
              {
                model: User,
                attributes: ['username']
              }
            ]
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
    })

    module.exports = router;