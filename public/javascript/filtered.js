async function filterPosts(event) {
    event.preventDefault();

    const species = event.target.getAttribute("id");

    console.log(species);
    
    if(species){
        document.location.replace(`/filtered/${species}`);
    }
}

document.querySelector('.quick-search-form').addEventListener('click', filterPosts);