describe('Job Component', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente
    // Asegúrate de cambiar la URL a la correcta para tu aplicación
    cy.visit('https://64a96bda96f7186ced6e08c9-gxujxlyrgm.chromatic.com/iframe.html?args=&id=forms-job--primary&viewMode=story');
  });

  it('renders the component', () => {
    // Verifica que el componente se renderiza correctamente
    cy.get('form').should('exist');
  });

  it('fills the form and submits', () => {
    // Interactúa con los campos del formulario
    // Asegúrate de cambiar los selectores y los valores a los correctos para tu aplicación
    cy.contains('Search skill...').type('carpet cleaning');
    cy.contains('Select a city').type('Medellín');

    // Guarda la configuración de la habilidad
    cy.get('Button').contains('Search Service').click();

    // Cambia a la pestaña de resumen de habilidades
    cy.get('p').contains('Propose services').click();

    // Envía el formulario
    cy.get('form').submit();
  });
});
