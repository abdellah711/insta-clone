
describe('Authentication', () => {

  before(()=>{
    cy.exec('yarn db:reset')
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('allow user to sign up', () => {

    cy.contains(/sign up/i).should("have.attr", 'href', '/auth/signup').click()
    cy.get('input[name="fullname"]').should('exist')

    cy.get('input[name="email"]').type('cy@test.com')
    cy.get('input[name="fullname"]').type('cy test')
    cy.get('input[name="username"]').type('cypress')
    cy.get('input[name="password"]').type('cypress')
    cy.contains('button', /sign up/i).should('be.enabled').click()

    cy.contains('a', /login/i).click()

    cy.location('pathname').should('eq', '/auth/login')

    cy.get('input[name=fullname]').should('not.exist')

    cy.get('input[name="email"]').type('cy@test.com')
    cy.get('input[name="password"]').type('cypress')
    cy.contains('button', /login/i).should('be.enabled').click()
    cy.location('pathname').should('eq', '/')

  })

  it('redirect logged in users', () => {
    cy.login()
    cy.visit('/auth/login')
    cy.location('pathname').should('eq', '/')
  })

  it('doesn\'t allow duplicate username or email', () => {
    cy.visit('/auth/signup')
    cy.get('[name=username]').type('cypress').blur().get('svg[data-name=error-icon]').should('be.visible')
    
    cy.get('[name=email]').type('cy@test.com').blur().get('svg[data-name=error-icon]').should('have.length',2)
    
  })
  
  it('doesn\'t allow empty username or email', () => {
    cy.visit('/auth/signup')
    cy.get('[name=username]').focus().blur().get('svg[data-name=error-icon]').should('be.visible')
    
    cy.get('[name=email]').focus().blur().get('svg[data-name=error-icon]').should('have.length',2)
    
  })

  it('allow user to logout', () => {
    cy.login()
    cy.get('[alt="profile image"]').click()
    cy.contains('button',/log out/i).click()
    cy.location('pathname').should('eq','/auth/login')
    cy.visit('/')
    cy.location('pathname').should('eq','/auth/login')
  })

})

export { }