
describe('Home page', () => {
    beforeEach(() => {
        cy.exec('yarn db:reset && yarn db:seed')
        cy.visit('/')
        cy.login()
    })
    it.skip('shows suggestions and allow user to follow', () => {
        cy.viewport('macbook-11')
        cy.get('[role=suggestions]').should('exist').contains('button', /follow/i).click().should('have.text', 'Following')
    })
    it.skip('allows user to like posts', () => {
        cy.get('article').first().contains('p', /\d like(s?)/i).should('have.text', '0 likes')
        cy.get('article').first().find('button > svg').last().click()
        cy.get('article').first().contains('p', /\d like(s?)/i).should('have.text', '1 like')
        cy.reload()
        cy.get('article').first().contains('p', /\d like(s?)/i).should('have.text', '1 like')
    })

    it.skip('allows user to create new posts', () => {
        cy.get('[role=dialog]').should('not.exist')
        cy.get('[aria-label="Add post"]').click()
        cy.get('[role=dialog]').should('exist')
        cy.get('textarea').type('Hello world from Cypress')
        cy.get('input[type=file]').selectFile('public/assets/images/test/post3.jpg', { force: true }).should('not.exist')
        cy.contains('button', /post/i).should('be.enabled').click()
        cy.contains('p', /post shared successfully/i).should('exist')

        cy.reload()

        cy.get('article').first().contains(/hello world from cypress/i).should('exist')
    })

    describe('Search', () => {
        it('allows user to look for people to follow', () => {
            cy.get('[aria-label="Search input"]').type('test')
            
            cy.get('[aria-label="search result"]').find('li').should('have.length',1)
            .first().contains(/test/i)
        
            
        })

        it.skip('shows error if something went wrong', () => {
            cy.intercept('/api/users?search=*', (req) => {
                req.destroy()
            })
            cy.get('[aria-label="Search input"]').type('test')
            
            cy.get('[aria-label="search result"]').contains('p', /something went wrong/i).should('exist')
        })
        
        
        it.skip('makes only one request per search', () => {
            cy.intercept('/api/users?search=*',cy.spy().as('searchRequest'))
            cy.get('[aria-label="Search input"]').type('test').wait(200).type('test')

            cy.get('@searchRequest').should('have.callCount',1)  
        })


    })
})


export { }