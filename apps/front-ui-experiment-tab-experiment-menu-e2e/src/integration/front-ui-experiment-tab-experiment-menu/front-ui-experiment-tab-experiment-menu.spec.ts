describe('front-ui-experiment-tab-experiment-menu: FrontUiExperimentTabExperimentMenu component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontuiexperimenttabexperimentmenu--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabExperimentMenu!'
    );
  });
});
