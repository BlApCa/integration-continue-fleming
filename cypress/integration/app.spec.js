// JavaScript - cypress/integration/app.spec.js
describe('User Management', () => {
    it('should create a user', () => {
        cy.visit('/');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();
        cy.contains('User created successfully');
    });

    it('should display users', () => {
        cy.visit('/users');
        cy.contains('test@example.com');
    });
});