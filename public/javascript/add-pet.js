// async function createPet(event) {
//     event.preventDefault();

//     const pet_name = document.querySelector('#pet-name').value;
//     const breed = document.querySelector('#breed').value;
//     const species = document.querySelector('#species').value;
//     const color = document.querySelector('#color').value;
//     const when_encounter = document.querySelector('#when-encounter').value;
//     const pet_age = document.querySelector('#age').value;
//     const unique_features = document.querySelector('#when-encounter').value;

//     console.log(
//         species,
//         pet_name,
//         pet_age,
//         color,
//         breed,
//         unique_features,
//         when_encounter
//     );

//     const response = await fetch(`/api/pets/`, {
//         method: 'POST',
//         body: JSON.stringify({
//             pet_name,
//             species,
//             breed,
//             color,
//             when_encounter,
//             pet_age,
//             unique_features
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//             console.log(response.statusText);
//     }
// }

// document.querySelector('#pet-info-form').addEventListener('submit', createPet);