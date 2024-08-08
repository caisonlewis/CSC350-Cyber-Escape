document.addEventListener('DOMContentLoaded', () => {
  // Get the logout button element
  const logoutButton = document.getElementById('logout-button')

  // Retrieve username from local storage
  const username = localStorage.getItem('username')

  if (username) {
    // If user is logged in, show the logout button
    logoutButton.style.display = 'block'

    // Add a click event listener to the logout button
    logoutButton.addEventListener('click', () => {
      // Remove username from local storage
      localStorage.removeItem('username')
      // Redirect the user to the login page
      window.location.href = '../index.html'
    })
  } else {
    // If user is not logged in, hide the logout button
    logoutButton.style.display = 'none'
  }
})
