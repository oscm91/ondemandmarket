describe('Services Component', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente
    // Asegúrate de cambiar la URL a la correcta para tu aplicación
    cy.visit('https://64a96bda96f7186ced6e08c9-gxujxlyrgm.chromatic.com/iframe.html?args=&id=forms-services--primary&viewMode=story');
  });

  it('renders the component', () => {
    // Verifica que el componente se renderiza correctamente
    cy.get('form').should('exist');
  });

  it('fills the form and submits', () => {
    // Interactúa con los campos del formulario
    // Asegúrate de cambiar los selectores y los valores a los correctos para tu aplicación
    cy.get('span').contains('carpet cleaning').click();
    cy.get('span').contains('Skill Settings').click();
    cy.get('button[aria-label="More actions"]').click();
    cy.get('span').contains('Edit').click();
    cy.get('button').contains('Save').click();
    cy.get('span').contains('Skill Summary').click();
    cy.get('Button').contains('Confirm Services').click();
    cy.get('form').submit();
  });
});
