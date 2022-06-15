const router = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: '../public/uploads' })

const { Pet } = require('../../models')
const {uploadFile, downloadFile} = require('../../s3')
const fs = require('fs')
const util = require('fs')
const promisify = require('util.promisify')

const removeFile = promisify(fs.unlink)

// Get all pets 
router.get('/all', (req, res) => {
    Pet.findAll({
        attributes: [
            'id',
            'pet_name',
            'pet_age',
            'species',
            'breed',
            'color',
            'when_encounter',
            'unique_features',
            'photo',
            'user_id'
        ],
        
    })
    .then(dbPetData => {
        
        res.json(dbPetData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
})
// Get all pets 
router.get('/', (req, res) => {
    console.log(req.query.name)
    Pet.findAll({
        attributes: [
            'id',
            'pet_name',
            'pet_age',
            'species',
            'breed',
            'color',
            'when_encounter',
            'unique_features',
            'photo',
            'user_id'
        ],
        where: {
            pet_name: req.query.name
        }
    })
    .then(dbPetData => {
        const petIdData = (dbPetData[0].dataValues.id)
        res.json(petIdData)
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
// Get a pet by USERNAME
// router.get('/', (req, res) => {
//     Pet.findOne({
//         where: {
//             pet_name: req.query.name
//         },
//         attributes: [
//             'id',
//             'pet_name',
//             'photo'

//         ]    
//     })
//     .then(dbPetData => {
//         res.json(dbPetData)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// })

// Create a pet
router.post('/', (req, res) => {
    Pet.create({
        pet_name: req.body.pet_name,
        pet_age: req.body.pet_age,
        species: req.body.species,
        breed: req.body.breed,
        color: req.body.color,
        when_encounter: req.body.when_encounter,
        photo: req.body.photo,
        unique_features: req.body.unique_features,
        user_id: req.body.user_id
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

// Downloads the image from AWS bucket and displays that image 
router.get('/images/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)

    // Sends the image data right to the user
    readStream.pipe(res)
    // res.redirect(`/images/${key}`)
})
 
// Grabs form data and creates a new Pet 
router.post('/create-pet', upload.single('photo'), async (req, res) => {
    const file = req.file

    // Uploads the image to AWS bucket 
    const result = await uploadFile(file)

    // Grab form data
    const petName = req.body.pet_name
    const petAge = req.body.pet_age
    const petSpecies = req.body.species
    const petBreed = req.body.breed
    const petColor = req.body.color
    const petWhenEncounter = req.body.when_encounter
    const petPhoto = result.Key
    const petUniqueFeatures = req.body.unique_features

    // Removes file from 'uploads' directory
    await removeFile(file.path)
    // res.redirect(`/api/pets/images/${result.Key}`)
    res.redirect('/')

    // Insert form data to create a new pet
    Pet.create({
        pet_name: petName,
        pet_age: petAge,
        species: petSpecies,
        breed: petBreed,
        color: petColor,
        when_encounter: petWhenEncounter,
        unique_features: petUniqueFeatures,
        photo: petPhoto,
        user_id: req.session.user_id
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

module.exports = router


