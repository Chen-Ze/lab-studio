describe('front-ui-experiment-tab-enum-input: FrontUiExperimentTabEnumInput component', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=frontuiexperimenttabenuminput--primary&args=enumObject;'
    )
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to FrontUiExperimentTabEnumInput!');
  });
});
