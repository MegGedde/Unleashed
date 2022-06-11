const router = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: '../../uploads' })
const { Pet } = require('../../models')
const {uploadFile, downloadFile} = require('../../s3')
const fs = require('fs')
const util = require('fs')
const promisify = require('util.promisify')

const removeFile = promisify(fs.unlink)

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

// Downloads the image from AWS bucket and displays that image 
router.get('/images/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)

    // Sends the image data right to the user
    readStream.pipe(res)
    // res.redirect(`/images/${key}`)
})
 
// Uploads the image to AWS bucket
router.post('/images', upload.single('photo'), async (req, res) => {
    const file = req.file
    const result = await uploadFile(file)

    // Grab form data
    const petName = req.body.pet_name
    const petSpecies = req.body.species
    const petBreed = req.body.breed
    const petColor = req.body.color
    const petWhenEncounter = req.body.when_encounter
    const petPhoto = result.Key

    // Removes file from 'uploads' directory
    await removeFile(file.path)
    res.redirect(`/images/:${result.Key}`)

    // Insert form data to create a new pet
    Pet.create({
        pet_name: petName,
        species: petSpecies,
        breed: petBreed,
        color: petColor,
        when_encounter: petWhenEncounter,
        photo: petPhoto
                // user_id: req.body.user_id
    })
    // .then(dbPetData => {
    //     res.json(dbPetData)
    // })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
 
  })

  router.post('/test', (req, res) => {
    console.log(req.body)
  })

module.exports = router