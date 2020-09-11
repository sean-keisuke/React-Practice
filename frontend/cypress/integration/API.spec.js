describe ('API Tests', () => {
it('GETs Projects', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.visit('/ProjectsPage');
    cy.wait('@getProjects').should('have.property', 'status', 200) ;

    cy.get('.projectitem').should('have.length', 3);
  })
  it('GETs Todos', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/', 'fixture:todos.json').as("getTodos");
    cy.visit('/');
    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.wait('@getTodos').should('have.property', 'status', 200);
    
    cy.get('.todoitem').should('have.length', 4);
  })
  it('POSTs Todos', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/', 'fixture:todos.json').as("getTodos");
    cy.route({ method: 'POST', url: '/api/v1/todos/', response: 'fixture:postTodo.json', status: 201}).as("postTodos");
    cy.visit('/');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.wait('@getTodos').should('have.property', 'status', 200);
    cy.get('.todoitem').should('have.length', 4);

    cy.get('.add-todo',{timeout: 10000}).type('Cypress Todo!')
    cy.get('.btn').click()

    cy.wait('@postTodos').should('have.property', 'status', 201);
    
    cy.get('.todoitem').should('have.length', 5);
  })
  it('POSTs Project', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route({ method: 'POST', url: '/api/v1/projects/', response: 'fixture:postProject.json', status: 201}).as("postProject");
    cy.visit('/ProjectsPage');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.get('.projectitem').should('have.length', 3);

    cy.get('.add-project', {timeout: 10000}).type("Cypress Project")
    cy.get('.btn').click()

    cy.wait('@postProject').should('have.property', 'status', 201);
    
    cy.get('.projectitem').should('have.length', 4);
  })
  it('PUTs Todos', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/', 'fixture:todos.json').as("getTodos");
    cy.route({ method: 'PUT', url: '/api/v1/todos/357', response: 'fixture:editTodo.json', status: 202}).as("putTodo");
    cy.visit('/');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.wait('@getTodos').should('have.property', 'status', 200);
    cy.get('.todoitem').should('have.length', 4);

    cy.get('.todoitem', {timeout: 10000}).contains("add 1").find('.toggle-edit').click()
    cy.get('.edit-text-field').clear()
    cy.get('.edit-text-field').type("Cypress Todo EDIT!")
    cy.get('.edit-btn').click()

    cy.wait('@putTodo').should('have.property', 'status', 202);
    
    cy.get('.todoitem').should('have.length', 4);
  })
  it('PUTs Projects', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route({ method: 'PUT', url: '/api/v1/projects/2173', response: 'fixture:editProject.json', status: 202}).as("putProject");
    cy.visit('/ProjectsPage');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.get('.projectitem').should('have.length', 3);


    cy.get('.projectitem', {timeout: 10000}).contains("Project 2").find('.toggle-edit').click()
    cy.get('.edit-text-field').clear()
    cy.get('.edit-text-field').type("CYPRESS PROJECT EDIT")
    cy.get('.edit-btn').click()

    cy.wait('@putProject').should('have.property', 'status', 202);
    
    cy.get('.projectitem').should('have.length', 3);
  })
  it('DELETEs Todo', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/', 'fixture:todos.json').as("getTodos");
    cy.route({ method: 'DELETE', url: '/api/v1/todos/357', response: 'fixture:editTodo.json', status: 204}).as("deleteTodo");
    cy.visit('/');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.wait('@getTodos').should('have.property', 'status', 200);
    cy.get('.todoitem').should('have.length', 4);

    cy.get('.todoitem', {timeout: 10000}).contains("add 1").find('.delete-btn').click()

    cy.wait('@deleteTodo').should('have.property', 'status', 204);
    
    cy.get('.todoitem').should('have.length', 3);
  })
  it('DELETEs Projects', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route({ method: 'DELETE', url: '/api/v1/projects/2173', response: 'fixture:editProject.json', status: 204}).as("deleteProject");
    cy.visit('/ProjectsPage');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.get('.projectitem').should('have.length', 3);

    cy.get('.projectitem', {timeout: 10000}).contains("Project 2").find('.delete-btn').click()

    cy.wait('@deleteProject').should('have.property', 'status', 204);
    
    cy.get('.projectitem').should('have.length', 2);
  })
  it('DELETEs all Todos', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");
    cy.route('GET', '/api/v1/todos/', 'fixture:todos.json').as("getTodos");
    
    cy.route({ method: 'DELETE', url: '/api/v1/todos/357', response: 'fixture:editTodo.json', status: 204}).as("deleteTodo1");
    cy.route({ method: 'DELETE', url: '/api/v1/todos/358', response: 'fixture:editTodo.json', status: 204}).as("deleteTodo2");
    cy.route({ method: 'DELETE', url: '/api/v1/todos/359', response: 'fixture:editTodo.json', status: 204}).as("deleteTodo3");
    cy.route({ method: 'DELETE', url: '/api/v1/todos/360', response: 'fixture:editTodo.json', status: 204}).as("deleteTodo4");
    cy.visit('/');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.wait('@getTodos').should('have.property', 'status', 200);
    cy.get('.todoitem').should('have.length', 4);

    cy.contains('Clear List', {timeout: 10000}).click()
    cy.wait(['@deleteTodo1','@deleteTodo2','@deleteTodo3', '@deleteTodo4']).should((xhrs) =>{
      expect(xhrs[0].status, 'successful DELETE').to.equal(204)
      expect(xhrs[1].status, 'successful DELETE').to.equal(204)
      expect(xhrs[2].status, 'successful DELETE').to.equal(204)
      expect(xhrs[3].status, 'successful DELETE').to.equal(204)
    })

    cy.get('.todoitem').should('have.length', 0);
  })
  it('DELETEs all Projects', () => {
    cy.server();
    cy.route('GET', '/api/v1/projects/', 'fixture:projects.json').as("getProjects");

    cy.route({ method: 'DELETE', url: '/api/v1/projects/2172', response: 'fixture:editProject.json', status: 204}).as("deleteProject1");
    cy.route({ method: 'DELETE', url: '/api/v1/projects/2173', response: 'fixture:editProject.json', status: 204}).as("deleteProject2");
    cy.route({ method: 'DELETE', url: '/api/v1/projects/2174', response: 'fixture:editProject.json', status: 204}).as("deleteProject3");

    cy.visit('/ProjectsPage');

    cy.wait('@getProjects').should('have.property', 'status', 200);
    cy.get('.projectitem').should('have.length', 3);

    cy.contains('Clear Projects', {timeout: 10000}).click()
    cy.wait(['@deleteProject1','@deleteProject2','@deleteProject3']).should((xhrs) =>{
      expect(xhrs[0].status, 'successful DELETE').to.equal(204)
      expect(xhrs[1].status, 'successful DELETE').to.equal(204)
      expect(xhrs[2].status, 'successful DELETE').to.equal(204)
    })
    
    cy.get('.projectitem').should('have.length', 1);
  })
})