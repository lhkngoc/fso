Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3001')
    })
})

Cypress.Commands.add('createBlog', ({ newObject }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { author:newObject.author,title:newObject.title,url:newObject.url},
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })

    cy.visit('http://localhost:3001')
  })

  Cypress.Commands.add('deleteBlog', ({ newObject }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'DELETE',
      body: { id:newObject.id},
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })

    cy.visit('http://localhost:3001')
  })