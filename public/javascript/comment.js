async function commentFormHandler(event) {
    event.preventDefault();

    const comment = document.querySelector('#comment-text').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(
        comment,
        post_id
    );

    if (comment) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                comment,
                post_id
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
}

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);