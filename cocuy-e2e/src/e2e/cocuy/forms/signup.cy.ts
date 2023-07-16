describe('Signup Component', () => {
  beforeEach(() => {
    // Visita la historia de Storybook para el componente de registro
    cy.visit('https://64a96bda96f7186ced6e08c9-gxujxlyrgm.chromatic.com/iframe.html?args=&id=forms-signup--primary&viewMode=story');
  });

  it('should render all fields', () => {
    cy.get('input[name="firstName"]').should('exist');
    cy.get('input[name="lastName"]').should('exist');
    cy.get('input[name="phoneNumber"]').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="confirmPassword"]').should('exist');
    cy.get('input[type="radio"]').should('exist');
  });

  it('should submit the form', () => {
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="phoneNumber"]').type('1234567890');
    cy.get('input[type="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('input[type="radio"]').first().check();
    cy.get('button[type="submit"]').click();
    // Aquí puedes agregar más aserciones para verificar que el formulario se envió correctamente
  });
});
