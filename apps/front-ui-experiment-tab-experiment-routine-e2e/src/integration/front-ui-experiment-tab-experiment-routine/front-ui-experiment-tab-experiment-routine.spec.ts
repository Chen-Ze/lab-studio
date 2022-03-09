describe('front-ui-experiment-tab-experiment-routine: FrontUiExperimentTabExperimentRoutine component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontuiexperimenttabexperimentroutine--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabExperimentRoutine!'
    );
  });
});
