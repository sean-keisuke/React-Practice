describe ('Todo Components Test', () => {
  beforeEach(() => {
    cy.visit('/ProjectsPage')
    cy.contains('Clear Projects', {timeout: 10000}).click()

    cy.get('.add-project', {timeout: 10000}).type('Project 2')
    cy.get('.btn').click()
    cy.get('.projectitem', {timeout: 10000}).should('have.length', 2)

    cy.visit('/')
    cy.contains('Clear List', {timeout: 10000}).click()
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 0) 
  }) 
  it( 'Adding a single Todo', () => {
    cy.get('.add-todo',{timeout: 10000}).type('This is from Cypress!')
    cy.get('.btn').click()
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 1)
  })
  it( 'Attempt to add todo with no input', () => {
    cy.get('.btn', {timeout: 10000}).click()
    cy.get('.todoitem').should('have.length', 0)
  })
  it( 'Attempt to add whitespace only todo', () => {
    cy.get('.add-todo', {timeout: 10000}).type('\t\t\t\t\t\t')
    cy.get('.btn').click()
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 0)
  })
  it( 'Adding two Todos in different projects', () => {
    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress!')
    cy.get('.btn').click()
    
    cy.get('.add-todo').type('This is from Cypress again!')
    cy.get('#add-to-projects').select('Project 2')
    cy.get('.btn').click()

    cy.get('.todoitem', {timeout: 10000}).should('have.length', 2)
  })
  it('Properly Filters', () =>{
    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress!')
    cy.get('#add-to-projects', {timeout: 10000}).select('Default')
    cy.get('.btn').click()
    
    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress again!')
    cy.get('#add-to-projects').select('Project 2')
    cy.get('.btn').click()

    cy.get('#projects', {timeout: 10000}).select('Default')
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 1)

    cy.get('#projects', {timeout: 10000}).select('Show All')
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 2)
  })
  it('Edits a Todo', () => {
    cy.get('.add-todo').type('This is from Cypress!')
    cy.get('.btn').click()
    
    cy.get('.toggle-edit').click()
    cy.get('.edit-text-field').clear()
    cy.get('.edit-text-field').type('Editing from Cypress')
    cy.get('.edit-btn').click()

    cy.get('.todoitem').should('have.length', 1)
    cy.get('.todoitem', {timeout: 10000}).should('contain', 'Editing from Cypress')
  })
  it('Delete Single Item', () => {
    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress!')
    cy.get('.btn').click()

    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress again!')
    cy.get('#add-to-projects', {timeout: 10000}).select('Project 2')
    cy.get('.btn').click()

    cy.get('.todoitem', {timeout: 10000}).contains('This is from Cypress!').find('.delete-btn').click()
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 1)
  })
  it('Marking as Complete', () => {
    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress!')
    cy.get('.btn').click()

    cy.get('.add-todo', {timeout: 10000}).type('This is from Cypress again!')
    cy.get('#add-to-projects', {timeout: 10000}).select('Project 2')
    cy.get('.btn').click()

    cy.get('.todoitem', {timeout: 10000}).contains('This is from Cypress!').find('.complete-box').click() 
    cy.get('.toggle-hide').click()
    cy.get('.todoitem').should('have.length', 1)

    cy.get('.toggle-hide').click()
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 2)
  })
  it('Clears Todos', () =>{
    cy.contains('Clear List', {timeout: 10000}).click()
    cy.get('.todoitem', {timeout: 10000}).should('have.length', 0)
  })
  it('Clears Projects', () =>{
    cy.visit('/ProjectsPage')
    cy.contains('Clear Projects', {timeout: 10000}).click()
    cy.get('.projectitem', {timeout: 10000}).should('have.length', 1)
  })
});