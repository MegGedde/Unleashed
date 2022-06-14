const router = require('express').Router();
const { Post, User, Comment, Pet } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Pet,
          attributes: ['pet_name', 'species', 'breed', 'color']
        },
    //     {
    //       model: Comment,
    //       attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
    //       include: {
    //       model: User,
    //       attributes: ['username']
    //  }   },

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

  //get one post
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
      include: [
        {
            model: Pet,
            attributes: ['pet_name', 'pet_age', 'species', 'breed', 'color', 'when_encounter']
          },
      //     {
      //       model: Comment,
      //       attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
      //       include: {
      //       model: User,
      //       attributes: ['username']
      //  }   },
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

  //create a post
router.post('/', (req, res) => {
    Post.create({
        last_seen_time: req.body.last_seen_time,
        last_seen_street: req.body.last_seen_street,
        last_seen_city: req.body.last_seen_city,
        last_seen_state: req.body.last_seen_state,
        last_seen_country: req.body.last_seen_country,
        user_id: req.session.user_id,
        pet_id: req.body.pet_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// NEW POST
router.post('/create-post', (req, res) => {
  console.log('hi', req.body)
  res.redirect('/')
    Post.create({
        last_seen_time: req.body.last_seen_time,
        last_seen_street: req.body.last_seen_street,
        last_seen_city: req.body.last_seen_city,
        last_seen_state: req.body.last_seen_state,
        last_seen_country: "usa",
        user_id: req.session.user_id,
        pet_id: req.body.pet_id
    })
    // .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//edit a post
router.put('/:id', (req, res) => {
    Post.update(
      {
        last_seen_time: req.body.last_seen_time,
        last_seen_street: req.body.last_seen_street,
        last_seen_city: req.body.last_seen_city,
        last_seen_state: req.body.last_seen_state,
        last_seen_country: req.body.last_seen_country,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
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

  //delete a post
  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
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
  
  
  
    module.exports = router;