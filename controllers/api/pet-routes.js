const router = require('express').Router();

const { Pet } = require('../../models')

// Get all pets 
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'pet_name',
            'species',
            'breed',
            'color',
            'when_encounter',
            'photo'
        ]
    })
    .then(dbPetData => {
        res.json(dbPetData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})
// Get a pet by ID
router.get('/:id', (req, res) => {
    Pet.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'pet_name',
            'species',
            'breed',
            'color',
            'when_encounter',
            'photo'
        ]    
    })
    .then(dbPetData => {
        res.json(dbPetData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// Create a pet
router.post('/', (req, res) => {
    Pet.create({
        pet_name: req.body.pet_name,
        species: req.body.species,
        breed: req.body.breed,
        color: req.body.color,
        when_encounter: req.body.when_encounter,
        photo: req.body.photo
        // user_id: req.body.user_id
    })
    .then(dbPetData => {
        res.json(dbPetData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// DELETE a pet
router.delete('/:id', (req, res) => {
    Pet.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPetDelete => {
        res.json(dbPetDelete)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})

// UPDATE a pet
router.put('/:id', (req, res) => {
    Pet.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPetData => {
        if (!dbPetData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbPetData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})
module.exports = router