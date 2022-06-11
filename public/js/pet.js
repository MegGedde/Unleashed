
const nameInput = document.querySelector('.pet-name')
const speciesInput = document.querySelector('.species')
const breedInput = document.querySelector('.breed')
const colorInput = document.querySelector('.color')
const whenEncounterInput = document.querySelector('.when-encounter')
const form = document.querySelector('.pet-info-form')
const uploadPhotoBtn = document.querySelector('.upload-photo-btn')

// async function getId(yaya) {
//     event.preventDefault()

//     const petName = nameInput.value
//     const petBreed = breedInput.value
//     const petSpecies = speciesInput.value
//     const petColor = colorInput.value
//     const whenEncounter = whenEncounterInput.value
//     const key = `b12cf9229c698533c923859487f2e8ac`
//     // document.location.replace('http://localhost:3001/api/pets/images/b12cf9229c698533c923859487f2e8ac')
//     const response = await fetch(`/api/pets/images/${key}`, {
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if(response.ok) {
//         alert(`Success!`)
//         console.log(response)
//         const urlShorten = response.url.split('/')
//         const petId = urlShorten[urlShorten.length - 1]
//         console.log(`url shorten`, yaya)
//         createPet(petId, petName, petBreed, petSpecies, petColor, whenEncounter)
//     }
//     else {
//         alert(`Failure!`)
//     }

//     const id = yaya
//     console.log(yaya)
//     // alert('hi')
//     // const petName = nameInput.value
//     // const petBreed = breedInput.value
//     // const petColor = colorInput.value
//     // // const whenEncounter = whenEncounterInput.value

    
//     // console.log(photoKey, petName, petBreed, petColor, whenEncounter)
// }


// async function createPet(id, name, breed, species, color, encounter) {
//     const petId = id
//     const petName = name
//     const petBreed = breed
//     const petSpecies = species
//     const petColor = color
//     const petEncounter = encounter
//     console.log(petId, petName, petBreed, petSpecies ,petColor, petEncounter)

//     const response = await fetch(`/api/pets/`, {
//         method: 'POST',
//         body: JSON.stringify({
//             pet_name: petName,
//             species: petSpecies,
//             breed: petBreed,
//             color: petColor,
//             when_encounter: petEncounter,
//             photo: petId

//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }

//     })
//     if(response.ok) {
//         alert(`Success!`)
//     }
// }

// form.addEventListener('submit', getId)
