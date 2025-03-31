describe('Login Test', () => {
  it('should login successfully and set the token cookie', () => {
    cy.visit('http://localhost:5173/login')

    cy.get("input[name='username']").type('testuser')
    cy.get("input[name='password']").type('password')

    cy.get("button[type='submit']").click()

    cy.wait(500)
    cy.getCookie('token').should('exist')
  })
})