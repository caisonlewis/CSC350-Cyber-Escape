/* eslint-disable */
describe('Do we have a question', () => {


  it('should have question text ', () => {
cy.visit("http://localhost:5173/html/daily_challenge.html");

    // Check if qy=uestion is empty

    cy.get('[id="question_text"]').should('have.text', 'What is the primary purpose of a firewall?');

   
  });
});
