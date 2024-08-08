describe('Login Page', () => {
    beforeEach(() => {
        // Visit the login page
        cy.visit('http://localhost:5173/html/Login.html');
    });

    it('should display the login form', () => {
        // Check if the username input is visible
        cy.get('#username').should('be.visible');

        // Check if the password input is visible
        cy.get('#password').should('be.visible');

        // Check if the login button is visible
        cy.get('#login-button').should('be.visible').and('have.text', 'Login');
    });

    it('should login with valid credentials', () => {
        // Fill out the login form with valid credentials
        cy.get('#username').type('validuser');
        cy.get('#password').type('validPassword123');

        // Stub the POST request to simulate successful login
        cy.intercept('POST', 'http://localhost:3000/user/login', {
            statusCode: 200,
            body: { message: 'Login successful', success: true }
        }).as('loginRequest');

        // Click the login button
        cy.get('#login-button').click();

        // Wait for the login request to complete
        cy.wait('@loginRequest');

        // Check if the alert message is displayed
        cy.on('window:alert', (alertMessage) => {
            expect(alertMessage).to.equal('Login successful');
        });

        // Check if the user is redirected to the home page
        cy.url().should('include', '/index.html');
    });

    it('should display an error message on login failure', () => {
        // Fill out the login form with invalid credentials
        cy.get('#username').type('invaliduser');
        cy.get('#password').type('invalidPassword123');

        // Stub the POST request to simulate login failure
        cy.intercept('POST', 'http://localhost:3000/user/login', {
            statusCode: 401,
            body: { message: 'Incorrect password', success: false }
        }).as('loginRequest');

        // Click the login button
        cy.get('#login-button').click();

        // Wait for the login request to complete
        cy.wait('@loginRequest');

        // Check if the alert message is displayed
        cy.on('window:alert', (alertMessage) => {
            expect(alertMessage).to.equal('Incorrect password');
        });

        // Check if the user stays on the login page
        cy.url().should('include', '/Login.html');
    });
});
