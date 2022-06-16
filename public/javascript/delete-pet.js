async function deleteFormHandler(event) {
    event.preventDefault();

    const id = event.target.getAttribute("id");

    const response = await fetch(`/api/pets/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-pet-form').addEventListener('click', deleteFormHandler);