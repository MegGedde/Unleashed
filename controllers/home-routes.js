const router = require('express').Router();
const e = require('express');
const sequelize = require('../config/connection');
const { Post, User, Comment, Pet } = require('../models');

// HOMEPAGE
router.get('/', (req, res) => {
  console.log(req.session);
    Post.findAll({
        attributes: ['id', 'title', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
            include: [
              {
                model: Pet,
                attributes: ['pet_name', 'pet_age', 'species', 'breed', 'color', 'when_encounter', 'photo']
              },
              {
                model: User,
                attributes: ['username']
              }
            ]
          })
          .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));  
            console.log(posts)   
            res.render('homepage', {
              posts,
              loggedIn: req.session.loggedIn
            });
          })
          .catch(err => {
           console.log(err);
          res.status(500).json(err);
          });
        });

// LOGIN AND SIGN UP
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    console.log('successfully logged in')
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  else {
    console.log('error signing up')
  }
  res.render('signup');
});

// DASHBOARD
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],

            include: [
              {
                model: Pet,
                attributes: ['pet_name', 'species', 'breed', 'color', 'when_encounter', 'photo'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              },
              // {
              //   model: Comment,
              //   attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
              //   include: {
              //     model: User,
              //     attributes: ['username']
              //   }
              // },
              {
                model: User,
                attributes: ['username']
              }
            ]
          })

    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ADD A PET
router.get('/addpet', (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('add-pet', {
    dashboard: true,
    loggedIn: true
  });
});


// ADD A POST
router.get('/addpost', (req, res) => {
  Pet.findAll({
    attributes: ['id', 'pet_name', 'user_id'],
    where: {
      user_id: req.session.user_id
    }
       
      })
      .then(dbPostData => {
        const pets = dbPostData.map(pet => pet.get({ plain: true })); 
        console.log(pets)    
        res.render('add-post', {
          pets,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
       console.log(err);
      res.status(500).json(err);
      });
})
// // SINGLE POST
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
    include: [
      {
        model: Pet,
        attributes: ['pet_name', 'species', 'breed', 'color', 'when_encounter', 'photo'],
        include: {
          model: User,
          attributes: ['username']
        }
      },

        
              // {
              //   model: Comment,
              //   attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
              //   include: {
              //     model: User,
              //     attributes: ['username']
              //   }
              // },
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
            const post = dbPostData.get({ plain: true });        
            res.render('single-post', {
              posts,
              loggedIn: req.session.loggedIn
            });
          })
          .catch(err => {
           console.log(err);
          res.status(500).json(err);
          });
        });




router.get('/editpost/:id', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'last_seen_time', 'last_seen_street', 'last_seen_city', 'last_seen_state', 'last_seen_country', 'created_at'],
    include: [
      {
        model: Pet,
        attributes: ['pet_name', 'species', 'breed', 'color', 'when_encounter', 'photo'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
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
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', {
        post,
        dashboard: true,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ADD A PET
router.get('/addpost', (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('add-post');
});

module.exports = router;