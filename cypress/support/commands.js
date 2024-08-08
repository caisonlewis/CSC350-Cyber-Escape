// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Command for easier testing of logged in user, call before cy.login();

import "cypress-localstorage-commands";

Cypress.Commands.add('signup', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/html/SignUp.html');

    // Enter username and password
    cy.get('#username').type('test');
    cy.get('#password').type('test');
    cy.get('#email').type('test');

    // Click on the login button
    cy.get('#signup-button').click();
});

// Less strict version of login(), used with signup()

Cypress.Commands.add('loginLess', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/html/Login.html');

    // Enter username and password
    cy.get('#username').type('test');
    cy.get('#password').type('test');

    // Click on the login button
    cy.get('#login-button').click();
});

// login command used for logout test

Cypress.Commands.add('login', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/html/Login.html');

    // Enter username and password
    cy.get('#username').type('test');
    cy.get('#password').type('test');

    // Click on the login button
    cy.get('#login-button').click();

    // Assert that login was successful by checking the URL or any other indicator
    cy.url().should('include', '/index.html');
});

