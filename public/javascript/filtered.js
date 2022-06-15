async function speciesDog() {
  await fetch('/api/posts/Dog', {
            method: 'GET',
            body: JSON.stringify({
                post_species
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/homepage/');
        } else {
            alert(response.statusText);
        }
}

async function speciesCat() {
  await fetch('/post/Cat', {
            method: 'GET',
            body: JSON.stringify({
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
async function speciesReptile() {
    await fetch('/post/Reptile', {
              method: 'GET',
              body: JSON.stringify({
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
  async function speciesOther() {
    await fetch('/post/Other', {
              method: 'GET',
              body: JSON.stringify({
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


document.querySelector('.dogs').addEventListener('submit', speciesDog);
document.querySelector('.cats').addEventListener('submit', speciesCat);
document.querySelector('.reptile').addEventListener('submit', speciesReptile);
document.querySelector('.other').addEventListener('submit', speciesOther);