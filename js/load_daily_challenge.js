document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/user/login', { // Connect
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'bob100', password: 'Password1!' })
    // We need to figure out how to connect to the question database.
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message)
      if (data.success) {
        console.log(data)
      }
    })
    .catch(error => {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    })
})
