describe('User Registration and Admin Features', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should register a new user successfully', () => {
        // Open the device
        cy.get('#Clicker-Btn').click();

        // Fill the registration form
        cy.get('[data-testid="input-firstName"]').type('John');
        cy.get('[data-testid="input-lastName"]').type('Doe');
        cy.get('[data-testid="input-email"]').type('john.doe@example.com');
        cy.get('[data-testid="input-birthDate"]').type('2000-01-01');
        cy.get('[data-testid="input-city"]').type('Paris');
        cy.get('[data-testid="input-postalCode"]').type('75000');

        // Submit form
        cy.get('[data-testid="registration-form"]').submit();

        // Check success toast
        cy.get('[data-testid="toast-success"]').should('be.visible');
    });

    it('should show validation errors', () => {
        // Open the device
        cy.get('#Clicker-Btn').click();

        // Submit empty form
        cy.get('[data-testid="registration-form"]').submit();

        // Check error messages
        cy.contains('Le prénom n\'est pas valide').should('be.visible');
        cy.contains('Le nom n\'est pas valide').should('be.visible');
        cy.contains('L\'email n\'est pas valide').should('be.visible');
    });

    it('should allow admin login and user management', () => {
        cy.intercept('POST', '/login', {
            statusCode: 200,
            body: { success: true }
        }).as('login');

        cy.intercept('GET', '/users*', {
            statusCode: 200,
            body: {
                users: [
                    {
                        id: 1,
                        email: 'john.doe@example.com',
                        first_name: 'John',
                        last_name: 'Doe'
                    }
                ]
            }
        }).as('getUsers');

        // Admin login
        cy.visit('/admin');
        cy.get('[data-testid="admin-email"]').type('loise.fenoll@ynov.com');
        cy.get('[data-testid="admin-password"]').type('PvdrTAzTeR247sDnAZBr');
        cy.get('[data-testid="admin-login"]').click();
        cy.wait('@login');

        // Check user list
        cy.wait('@getUsers');
        cy.get('[data-testid="user-list"]').should('be.visible');
        cy.get('[data-testid="user-row"]').should('have.length', 1);

        // Delete user
        cy.intercept('DELETE', '/users/*', {
            statusCode: 200,
            body: { message: 'User deleted successfully' }
        }).as('deleteUser');

        cy.get('[data-testid="delete-user"]').first().click();
        cy.wait('@deleteUser');
        cy.contains('User deleted successfully').should('be.visible');
    });
});