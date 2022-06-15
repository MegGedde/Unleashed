async function newFormHandler(event) {
    event.preventDefault();
    const last_seen_time = document.querySelector('#time').value;
    const last_seen_street = document.querySelector('#street').value;
    const last_seen_city = document.querySelector('#city').value;
    const last_seen_state = document.querySelector('#state').value;
    const last_seen_country = document.querySelector('#country').value;

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(
        last_seen_time,
        last_seen_street,
        last_seen_city,
        last_seen_state,
        last_seen_country,
        post_id
    );

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            last_seen_time,
            last_seen_street,
            last_seen_city,
            last_seen_state,
            last_seen_country
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

async function deleteFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', newFormHandler);
document.querySelector('#edit-post-form').addEventListener('reset', deleteFormHandler);