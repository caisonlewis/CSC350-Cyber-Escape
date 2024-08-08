/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  // const signupForm = document.getElementById('signup-form')
  const signupButton = document.getElementById('signup-button')

  signupButton.addEventListener('click', () => {
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value // Added email field
    const password = document.getElementById('password').value

    // Send data to server
    fetch('http://localhost:3000/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password }) // Include email in the request body
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message) // Show success message
        // Optionally, redirect or perform any other actions after successful sign-up
      })
      .catch(error => {
        console.error('Error:', error)
        alert('An error occurred. Please try again.')
      })
  })
})
