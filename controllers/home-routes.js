const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Pet } = require('../models');

// HOMEPAGE
router.get('/', (req, res) => {
  console.log(req.session);
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });

  // Post.findAll({
  //   attributes: [
  //   ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: [],
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
  //   .then(dbPostData => {
  //     // pass a single post object into the homepage template
  //     const posts = dbPostData.map(post => post.get({ plain: true }));
  //     res.render('homepage', {
  //       posts,
  //       loggedIn: req.session.loggedIn
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// LOGIN AND SIGN UP
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
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
  res.render('signup');
});

// DASHBOARD
router.get('/dashboard', (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('dashboard')

  // Post.findAll({
  //   where: {
  //     user_id: req.session.user_id
  //   },
  //   attributes: [
  //   ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: [],
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
  //   .then(dbPostData => {
  //     // serialize data before passing to template
  //     const posts = dbPostData.map(post => post.get({ plain: true }));
  //     console.log(posts);
  //     res.render('dashboard', {
  //       posts,
  //       dashboard: true,
  //       loggedIn: true
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
});

// ADD A PET
router.get('/addpet', (req, res) => {
  res.render('add-pet');
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  // res.render('add-post', {
  //   dashboard: true,
  //   loggedIn: true
  // });
});


// ALL POST GETS
// ADD A POST
router.get('/addpost', (req, res) => {
  res.render('add-post');
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  // res.render('add-post', {
  //   dashboard: true,
  //   loggedIn: true
  // });
});

// SINGLE POST
router.get('/post/:id', (req, res) => {
  res.render('single-post');
// Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: [],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }

//       // serialize the data
//       const post = dbPostData.get({ plain: true });

//       // pass data to template
//       res.render('single-post', {
//         post,
//         loggedIn: req.session.loggedIn
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
});



// router.get('/editpost/:id', (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   Post.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'content',
//       'created_at'
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }

//       // serialize the data
//       const post = dbPostData.get({ plain: true });

//       // pass data to template
//       res.render('edit-post', {
//         post,
//         dashboard: true,
//         loggedIn: true
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


module.exports = router;