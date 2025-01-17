/// <reference types="Cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    clearSession(): Chainable<void>;
    login(): Chainable<void>;
  }
}
