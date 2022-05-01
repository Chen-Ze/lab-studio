describe('front-experiments-container: FrontExperimentsContainer component', () => {
  beforeEach(() =>
    cy.visit('/iframe.html?id=frontexperimentscontainer--primary')
  );

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to FrontExperimentsContainer!');
  });
});
