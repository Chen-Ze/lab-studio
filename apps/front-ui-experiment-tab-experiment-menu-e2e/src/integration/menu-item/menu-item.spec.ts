describe('front-ui-experiment-tab-experiment-menu: MenuItem component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=menuitem--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to MenuItem!');
  });
});
