describe('front-ui-experiment-tab-instrument-input: FrontUiExperimentTabInstrumentInput component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontuiexperimenttabinstrumentinput--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should(
      'contain',
      'Welcome to FrontUiExperimentTabInstrumentInput!'
    );
  });
});
