/* eslint-disable */
describe('Profile Page Litmus Test', () => {
  beforeEach(() => {
    // Set localStorage 'username' variable to 'bob100'
    cy.window().then((win) => {
      win.localStorage.setItem('username', 'bob100');
    });

    cy.visit('http://localhost:5173/html/profile.html');
  });

  it('should have empty user information', () => {
    // Check if username is empty
    cy.get('[data-cy=username]').should('have.text', 'bob100');

    // Check if email is empty
    cy.get('[id=email]').should('have.text', 'bob100@mail.com');

    // Check if highest level is empty
    cy.get('[id=Level]').should('contain.text', 'Highest Level: 0');

    // Check if total points is empty
    cy.get('[id=Points]').should('contain.text', 'Total Points: 0');
  });
});
