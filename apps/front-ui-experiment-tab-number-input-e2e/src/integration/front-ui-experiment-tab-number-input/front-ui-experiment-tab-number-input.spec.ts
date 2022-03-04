describe('front-ui-experiment-tab-number-input: FrontUiExperimentTabNumberInput component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontuiexperimenttabnumberinput--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabNumberInput!'
    );
  });
});
