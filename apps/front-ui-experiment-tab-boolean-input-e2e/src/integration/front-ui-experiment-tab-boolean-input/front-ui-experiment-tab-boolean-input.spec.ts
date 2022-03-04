describe('front-ui-experiment-tab-boolean-input: FrontUiExperimentTabBooleanInput component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontuiexperimenttabbooleaninput--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabBooleanInput!'
    );
  });
});
