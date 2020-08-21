describe ('Components Test', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Clear List').click()
    cy.get('.todoitem').should('have.length', 0)
  }) 
  it( 'Adding a single Todo', () => {
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()
    cy.get('.todoitem').should('have.length', 1)
  })
  it( 'Adding two Todos in different projects', () => {
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()
    
    cy.get('.add-todo').type('This is from Cypress again!')
    cy.get('#add-to-projects').select('Project 2')
    cy.get('.btn').click()

    cy.get('.todoitem').should('have.length', 2)
  })
  it('Properly Filters', () =>{
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()
    
    cy.get('.add-todo').type('This is from Cypress again!')
    cy.get('#add-to-projects').select('Project 2')
    cy.get('.btn').click()

    cy.get('#projects').select('Default')
    cy.get('.todoitem').should('have.length', 1)
  })
  it('Clears Todos', () =>{
    cy.contains('Clear List').click()
    cy.get('.todoitem').should('have.length', 0)
  })
});