async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const phonePrimary = document.querySelector('#primary-phone-signup').value.trim();
    const phoneSecondary = document.querySelector('#secondary-phone-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password,
          email,
          phonePrimary,
          phoneSecondary
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
            username,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
  
        // check the response status
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);