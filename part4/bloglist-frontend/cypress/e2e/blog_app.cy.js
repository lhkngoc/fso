describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'ben251',
      username: 'ben251',
      password: 'ben251'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3001')

  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'ben251', password: 'ben251' })
      cy.contains("ben251 logged in")
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ben251', password: 'ben251' })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.title').type('html')
      cy.get('.author').type('ben')
      cy.get('.url').type('html.com')
      cy.contains('Submit').click()
      cy.contains(`a new Blog 'html' added`)
    })
    describe('Change detail in blog', function () {
      beforeEach(function () {
        const newBlog = {
          title: "html",
          author: 'ben',
          url:'html.com'
        }
        cy.contains('new blog').click()
        cy.createBlog({ newObject: newBlog })
        cy.contains('view').click()
      })
      it("User can like a blog", function () {
        cy.contains('like').click()
        cy.contains("1")
      })
      it("User who create a blog have permission to remove it", function () {
        cy.contains('remove').click()
        cy.get('.blog').should('have.length', 0)
      })
    })

  })

})
