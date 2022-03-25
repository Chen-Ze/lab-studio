describe('front-ui-experiment-tab-experiment: FrontUiExperimentTabExperiment component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontuiexperimenttabexperiment--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabExperiment!'
    );
  });
});
