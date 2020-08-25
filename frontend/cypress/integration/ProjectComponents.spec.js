describe ('Todo Components Test', () => {
    beforeEach(() => {
      cy.visit('/ProjectsPage')
    }) 
    it( 'deletes every project', () => {
        cy.get('.delete-btn').click({ multiple: true }, {force: true})
    })
})