describe('Should search by name', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9731/')
  })
  it('Search an input and expected results with name Rick', () => {
    const searchValue = 'rick'
    const expectName = 'Rick Sanchez'
    cy.get('.search-input').type(searchValue)
    cy.get('.character-content__title').should('contain', expectName)
  })

  it('loads more characters with pagination', () => {
    //cy.get('#content-visor').scrollTo('bottom')
    cy.wait(1000) // Wait for new characters to load
    cy.get('#content-visor').scrollIntoView()
    cy.get('.character-container').should('have.length.greaterThan', 20)
  })

  it('get data localStorage', () => {
    cy.reload()
  })
  xit('change theme', () => {
    cy.get('[data-id="icon-theme"]').click()
    cy.get('.App')
      .should('have.attr', 'class')
      .then((clases) => {
        const nameClass = clases.split(' ')

        // expect(nameClass).to.include('mi-clase');
      })
  })
})
