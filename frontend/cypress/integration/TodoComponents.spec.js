describe ('Todo Components Test', () => {
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

    cy.get('#projects').select('Show All')
    cy.get('.todoitem').should('have.length', 2)
  })
  it('Edits a Todo', () => {
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()
    
    cy.get('.toggle-edit').click()
    cy.get('.edit-text-field').clear()
    cy.get('.edit-text-field').type('Editing from Cypress')
    cy.get('.edit-btn').click()

    cy.get('.todoitem').should('have.length', 1)
    cy.get('.todoitem').should('contain', 'Editing from Cypress')
  })
  it('Delete Single Item', () => {
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()

    cy.get('.add-todo').type('This is from Cypress again!')
    cy.get('#add-to-projects').select('Project 2')
    cy.get('.btn').click()

    cy.get('.todoitem').contains('This is from Cypress again!').find('.delete-btn').click()
    cy.get('.todoitem').should('have.length', 1)
  })
  it('Marking as Complete', () => {
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()

    cy.get('.add-todo').type('This is from Cypress again!')
    cy.get('#add-to-projects').select('Project 2')
    cy.get('.btn').click()

    cy.get('.todoitem').contains('This is from Cypress again!').find('.complete-box').click() 
    cy.get('.toggle-hide').click()
    cy.get('.todoitem').should('have.length', 1)

    cy.get('.toggle-hide').click()
    cy.get('.todoitem').should('have.length', 2)
  })
  it('Clears Todos', () =>{
    cy.contains('Clear List').click()
    cy.get('.todoitem').should('have.length', 0)
  })
});