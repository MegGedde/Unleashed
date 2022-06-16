async function createPost(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const last_seen_time = document.querySelector('#time').value;
    const last_seen_street = document.querySelector('#street').value;
    const last_seen_city = document.querySelector('#city').value;
    const last_seen_state = document.querySelector('#state').value;
    const last_seen_country = document.querySelector('#country').value;
    const pet_select = document.querySelector('#pet')
    const pet_id= pet_select.options[pet_select.selectedIndex].getAttribute("id");

    console.log(
        title,
        last_seen_time,
        last_seen_street,
        last_seen_city,
        last_seen_state,
        last_seen_country,
        pet_id
    );

    const response = await fetch(`/api/posts/`, {
        method: 'POST',
        body: JSON.stringify({
            title,
        last_seen_time,
        last_seen_street,
        last_seen_city,
        last_seen_state,
        last_seen_country,
        pet_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
            console.log(response.statusText);
    }
}

document.querySelector('#post-info-form').addEventListener('submit', createPost);