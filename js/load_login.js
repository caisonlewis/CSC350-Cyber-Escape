/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
    // Get the login form and login button elements 
    // const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');

    // Add a click event listener to the login button
    loginButton.addEventListener('click', () => {
        // Get the username and password entered by the user from the form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Send the login data to the server using a POST request
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify({ username, password }) // Convert the data to JSON format and send it in the request body
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                alert(data.message); // Show the success or error message received from the server
                if (data.success) { // If login is successful
                    // Store the username in the browser's local storage *Might end up moving this to its own seperate 'user' class to be worked with as a variable*
                    localStorage.setItem('username', username);
                    // Initialize points in localStorage after successful login
                    localStorage.setItem('username', username);
                    localStorage.setItem('points', '0'); // Set initial points value
                    // Redirect the user to the home page
                    window.location.href = '../index.html';
                }
            })
            .catch(error => {
                console.error('Error:', error); // Log any errors to the console
                alert('An error occurred. Please try again.'); // Show an error message to the user
            });
    });

});
