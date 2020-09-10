describe ('API Tests', () => {
it('GETS Projects', () => {
    cy.server()
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/', 'fixture:todos.json').as("getTodos");
    cy.visit('/ProjectsPage')   
    cy.wait(['@getProjects', '@getTodos']).should('have.property', 'status', 200) 

    //cy.get('.projectitem').should('have.length', 3)
  })
  it('GETS Todos', () => {
    cy.server()
    cy.route('GET', '/api/v1/projects/*', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/*', 'fixture:todos.json').as("getTodos");
    cy.visit('/')
    cy.wait(['@getProjects', '@getTodos']).should('have.property', 'status', 200)
    
    //cy.get('.todoitem').should('have.length', 4)
  })
})