import { AppRoute } from "../../../src/app/routing/AppRoute.enum";

class Navigation {
  goToHome(): void {
    cy.get(`a[href*="${AppRoute.Home}"]`).first().click();
  }

  goToLogin(): void {
    cy.get(`a[href*="${AppRoute.Login}"]`).first().click();
  }

  get homeLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.Home}`;
  }

  get loginLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.Login}`;
  }
}

export const NavigationMenu = new Navigation();
