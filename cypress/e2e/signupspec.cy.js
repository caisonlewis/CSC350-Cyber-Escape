describe('Sign Up Page', () => {
    beforeEach(() => {
        // Visit the signup page
        cy.visit('http://localhost:5173/html/SignUp.html');
    });

    it('should display the signup form', () => {
        // Check if the email input is visible
        cy.get('#email').should('be.visible');

        // Check if the username input is visible
        cy.get('#username').should('be.visible');

        // Check if the password input is visible
        cy.get('#password').should('be.visible');

        // Check if the signup button is visible
        cy.get('#signup-button').should('be.visible').and('have.text', 'Sign Up');
    });

    it('should sign up a new user', () => {
        // Generate random user data
        const email = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
        const username = `testuser${Math.floor(Math.random() * 100000)}`;
        const password = 'testPassword123';

        // Fill out the signup form
        cy.get('#email').type(email);
        cy.get('#username').type(username);
        cy.get('#password').type(password);

        // Click the signup button
        cy.get('#signup-button').click();

        // Check if the alert message is displayed
        cy.on('window:alert', (alertMessage) => {
            expect(alertMessage).to.equal('Account created successfully');
        });
    });

    it('should display an error message on signup failure', () => {
        // Fill out the signup form with existing user data
        cy.get('#email').type('existinguser@example.com');
        cy.get('#username').type('existinguser');
        cy.get('#password').type('existingPassword123');

        // Click the signup button
        cy.get('#signup-button').click();

        // Check if the alert message is displayed
        cy.on('window:alert', (alertMessage) => {
            expect(alertMessage).to.equal('Error creating account. Please try again.');
        });
    });
});
