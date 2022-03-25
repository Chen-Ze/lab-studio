describe('front-feature-experiment-tab-experiment-renderer-provider: ExperimentRendererProvider component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=experimentrendererprovider--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ExperimentRendererProvider!');
  });
});
