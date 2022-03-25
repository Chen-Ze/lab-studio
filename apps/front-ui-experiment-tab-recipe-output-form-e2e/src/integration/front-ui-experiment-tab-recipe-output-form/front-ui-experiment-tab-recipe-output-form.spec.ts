describe('front-ui-experiment-tab-recipe-output-form: FrontUiExperimentTabRecipeOutputForm component', () => {
  beforeEach(() =>
    cy.visit(
      '/iframe.html?id=frontuiexperimenttabrecipeoutputform--primary&args=output;columns;onChange;'
    )
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabRecipeOutputForm!'
    );
  });
});
