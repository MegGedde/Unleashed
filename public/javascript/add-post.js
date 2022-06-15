const petButtons = document.querySelectorAll('.pet-btn')
const petId = document.querySelector('.pet-id')

// fetch the pet by pet id
async function grabPet(event) {
    const selectedPet = event.target.innerHTML
    
    const response = await fetch(`/api/pets/?name=${selectedPet}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response =>response.json())
    .then(data => {
        petId.value = data
   
    })
    console.log(response)
    if(response.ok) {
        console.log('hi', response.text)
    } else {
        console.log('failure')
    }
} 

petButtons.forEach(btn => {
    btn.addEventListener('click', grabPet)
})