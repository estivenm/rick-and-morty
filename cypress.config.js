import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl: 'https://rick-and-morty-eta-two.vercel.app/',
    baseUrl: 'http://localhost:9731',
    excludeSpecPattern: [
      'cypress/e2e/1-getting-started/*.js',
      'cypress/e2e/2-advanced-examples/*.js'
    ]
  }
})
