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

    it('Checks that the nav flyout hamburger is not visible on desktop', () => {
        cy.get('button#nav-flyout-toggle').should('not.be.visible')
    })

    // it('Should open and close the user nav dropdown on clicking the toggle', () => {
    //     cy.mockLoggedIn()

    //     cy.visit('http://localhost:3000/')

    //     cy.get('#dropdown-menu').click()

    //     cy.get('#dropdown-contents').should('be.visible')

    //     cy.get('#dropdown-menu').click()

    //     cy.get('#dropdown-contents').should('not.be.visible')

    //     cy.clearLocalStorage()
    // })

    // it.only('Should close the user nav dropdown when clicking outside the element', () => {
    //     cy.visit('http://localhost:3000/')

    //     cy.get('#dropdown-menu').click()

    //     cy.get('#dropdown-contents').should('be.visible')

    //     cy.get('h3').contains('What is Billpop').click()

    //     cy.get('#dropdown-contents').should('not.be.visible')

    //     cy.clearLocalStorage()
    // })
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

    // it('Should close dropdown if a user clicks outside the dropdown', () => {
    //     cy.visit('http://localhost:3000/')

    //      TODO: IMPLEMENT LOGIN SO WE CAN TEST THIS
    //     //Click the dropdown
    //     cy.get('div#dropdown-menu').click()

    //     cy.get('#dropdown-contents').should('be.visible')

    //     //Click outside the dropdown
    //     cy.get('h3').contains('What is Billpop').click()

    //     cy.get('#dropdown-contents').should('not.be.visible')
    // })

    it('Should close the nav flyout when clicking outside the flyout', () => {
        cy.visit('http://localhost:3000/')

        cy.get('button#nav-flyout-toggle').click()

        cy.wait(320)

        cy.get('div.flyout-menu').should('not.have.class', 'flyout-menu-closed')
        cy.get('div.flyout-menu').should('have.class', 'flyout-menu-open')
        cy.get('div.flyout-menu').should('be.visible')

        //Click outside the flyout
        cy.get('h3').contains('What is Billpop').click()
        cy.wait(320)

        cy.get('div.flyout-menu').should('not.have.class', 'flyout-menu-open')
        cy.get('div.flyout-menu').should('have.class', 'flyout-menu-closed')
        cy.get('div.flyout-menu').should('not.be.visible')
    })
})
