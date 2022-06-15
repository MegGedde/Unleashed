async function filterPosts(event) {
    event.preventDefault();

    const species = event.target.getAttribute("id");

    console.log(species);
    
    if(species){
        document.location.replace(`/filtered/${species}`);

    }

    // const response = await fetch('/api/posts/', {
    //     method: 'GET',
    //     body: JSON.stringify({
    //         species
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });
    // if (response.ok) {
    //     document.location.replace('/homepage/');
    // } else {
    //     alert(response.statusText);
    // }
}

document.querySelector('.quick-search-form').addEventListener('click', filterPosts);