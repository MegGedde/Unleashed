const router = require('express').Router();
const { Post, User, Comment, Pet } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Pet,
          attributes: ['pet_name', 'species', 'breed', 'color']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
          model: User,
          attributes: ['username']
     }   },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
          model: User,
          attributes: ['username']
     }   },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });