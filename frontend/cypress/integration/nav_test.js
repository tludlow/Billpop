describe('Tests nav button functionality on desktop', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
    })

    it('Checks that the logo links to the index page', () => {
        cy.visit('http://localhost:3000/accounts/login')

        cy.get('h1').contains('Billpop').click()

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Checks that the login button links to the login page', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button').contains('Login').click()

        cy.url().should('eq', 'http://localhost:3000/accounts/login')
    })

    it('Checks that the nav flyout hamburger is not visible', () => {
        cy.get('button#nav-flyout-toggle').should('not.be.visible')
    })
})

describe('Tests nav button functionality on mobile', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
    })

    it('Checks that the logo links to the index page', () => {
        cy.visit('http://localhost:3000/accounts/login')

        cy.get('h1').contains('Billpop').click()

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('Checks that the login button links to the login page', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button').contains('Login').click()

        cy.url().should('eq', 'http://localhost:3000/accounts/login')
    })

    it('Checks that the nav flyout hamburger is visible', () => {
        cy.get('button#nav-flyout-toggle').should('be.visible')
    })

    it('Checks that the nav flyout is hidden', () => {
        let flyout = cy.get('.flyout-menu')

        flyout.should('have.class', 'flyout-menu-closed')
        flyout.should('not.be.visible')
    })

    it('Checks that the nav flyout opens and closes', () => {
        let flyoutToggle = cy.get('button#nav-flyout-toggle')

        flyoutToggle.click()
        cy.wait(500)

        cy.get('.flyout-menu').should('be.visible')

        //Now check for closure

        cy.get('button#flyout-toggle-close').click()
        cy.wait(500)
        cy.get('.flyout-menu').should('not.be.visible')
    })
})
