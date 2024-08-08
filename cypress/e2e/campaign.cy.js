describe('Campaign', () => {
  before(() => {
    // Login to test account before tests
    cy.signup();
    cy.loginLess();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
      cy.restoreLocalStorage();
      // Visit the Campaign Page
      cy.visit('http://localhost:5173/html/campaign_basic.html');
  });

  it('navigates to level 1', () => {
    // Navigate to level 1
    cy.get('[id^=lvl1]').click();
    cy.url().should('include', '/level1.html');

    // Solve Level 1
    cy.get('[id^=button1]').click();

    // Used to increment progress through testing
    cy.saveLocalStorage();
  });

  it('navigates to level 2', () => {
    // Navigate to level 2
    cy.get('[id^=lvl2]').click();
    cy.url().should('include', '/level2.html');

    // "Solve" level 2
    cy.get('[id^=button1]').first().click();

    cy.saveLocalStorage();
  });
  
  it('navigates to level 3', () => {
    // Navigate to level 3
    cy.get('[id^=lvl3]').click();
    cy.url().should('include', '/level3.html');
    cy.saveLocalStorage();
    cy.visit('http://localhost:5173/html/campaign_basic.html');
  });

});
