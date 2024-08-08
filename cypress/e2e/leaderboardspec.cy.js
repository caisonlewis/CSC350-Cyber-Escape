describe('Leaderboard Page Functionality', () => {
    beforeEach(() => {
        // Load the leaderboard page before each test
        cy.visit('http://localhost:5173/html/leaderboard.html');
    });

    it('displays the leaderboard table with correct headers', () => {
        // Assert that the leaderboard table exists
        cy.get('table').should('exist');

        // Assert that the table has the correct headers
        cy.get('th').should('have.length', 3);
        cy.get('th').eq(0).should('contain', 'Rank');
        cy.get('th').eq(1).should('contain', 'Username');
        cy.get('th').eq(2).should('contain', 'Total Points');
    });

    it('populates the leaderboard table with data from the server', () => {
        // check that there are rows in the leaderboard table
        cy.get('table tr').should('have.length.gt', 1);

        // check if the first row contains the correct rank
        cy.get('table tr').eq(1).find('td').eq(0).should('contain', '1');
    });

    it('navigates to the homepage when "Go to Homepage" button is clicked', () => {
        // Click on the "Go to Homepage" button
        cy.get('.homepage-button').click();

        // make sure that the URL changes to the homepage URL
        cy.url().should('include', '/index.html');
    });
});
