async function filterSpeciesPosts(event) {
    event.preventDefault();

    const species = event.target.getAttribute("id");

    console.log(species);
    
    if(species){
        document.location.replace(`/filtered/${species}`);
    }
}

async function filterNamePosts(event) {
    event.preventDefault();
    console.log(event.target);
    const name = document.querySelector('#name').value;

    console.log(name);
    
    if(name){
        document.location.replace(`/name/${name}`);
    }
}

document.querySelector('.quick-search-form').addEventListener('click', filterSpeciesPosts);
document.querySelector('#name-search-form').addEventListener('submit', filterNamePosts);