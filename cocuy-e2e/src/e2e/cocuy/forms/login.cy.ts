describe('Login Component', () => {
  beforeEach(() => {
    // Visita la historia de Storybook para el componente de inicio de sesión
    cy.visit('https://64a96bda96f7186ced6e08c9-gxujxlyrgm.chromatic.com/iframe.html?args=&id=forms-login--primary&viewMode=story');
  });

  it('should render email and password fields', () => {
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });

  it('should submit the form', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    // Aquí puedes agregar más aserciones para verificar que el formulario se envió correctamente
  });
});