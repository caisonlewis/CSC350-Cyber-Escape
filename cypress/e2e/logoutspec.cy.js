// test logout functionality and appropriate button visibility

describe('Settings Page', () => {
    beforeEach(() => {
       
        cy.login(); // Custom command to log in from /cypress/support/commands.js
        cy.visit('localhost:5173/html/settings.html'); // Visit the settings page
    });

    it('should log out when logout button is clicked', () => {
        // Verify that the logout button is visible
        cy.get('#logout-button').should('be.visible');

        // Click on the logout button
        cy.get('#logout-button').click();

        // After clicking logout, verify that the user is redirected to the index page
        cy.url().should('include', '/index.html');

        // Verify that the user is logged out by checking if the login button is visible
        cy.get('#loginButton').should('be.visible');

        //verify that the user is logged out by checking if the signup button is visible
        cy.get('#signupButton').should('be.visible');

       
    });

});
