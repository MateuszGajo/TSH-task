/// <reference types="Cypress" />

describe("Products page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/products*").as("apiProduct");
    cy.visit(Cypress.env().baseUrl);
  });

  it("Should shows render component before product fetch request", () => {
    cy.get("[data-testid='product__loading']").should("exist");
    cy.wait("@apiProduct", { timeout: 12000 })
      .its("request.url")
      .should("contains", "limit=8");
    cy.get("[data-testid='product__loading']").should("not.exist");
  });

  it("Should render products along with pagination on mount", () => {
    cy.wait("@apiProduct", { timeout: 12000 })
      .its("request.url")
      .should("contains", "limit=8");

    cy.get('[data-testid="product__list"] > *').should("have.length", 8);
    cy.get("[data-testid='product__pagination']").should("exist");
  });

  it("Search non existing product should shows empty list", () => {
    cy.get("[data-testid='product__search']").type(
      "fdSAR#@RSDSVdasdas 432VWE$@{enter}"
    );
    cy.wait("@apiProduct");
    cy.contains("There are no products on the list");
  });

  it("Sorts should shows items contains particular text", () => {
    cy.wait("@apiProduct");
    cy.get("[data-testid='product__search']").type("fan{enter}");
    cy.wait("@apiProduct");
    cy.get('[data-testid="product__list"] > *').each(($item) => {
      expect($item.text().toLocaleLowerCase()).to.contain("fan");
    });
  });

  it("Should filters items", () => {
    cy.wait("@apiProduct");
    cy.get("label").contains("Promo").click();
    cy.wait("@apiProduct");
    cy.get('[data-testid="product__list"] > *').each(($item) => {
      expect($item.text().toLocaleLowerCase()).to.contain("promo");
    });

    cy.get("label").contains("Active").click();
    cy.wait("@apiProduct");
    cy.get('[data-testid="product__list"] > *').each(($item) => {
      expect($item.text().toLocaleLowerCase()).not.to.contain("unavailable");
    });
  });

  it("Product fetching error should be handled", () => {
    cy.intercept("GET", "/products*", {
      statusCode: 500,
      body: {},
    });
    cy.get("[data-testid='product__search']").type("abcd{enter}");
    cy.contains("Product loading error");

    cy.get("[data-testid='product__pagination']").should("not.exist");
  });

  it("Page changes should scroll to top", () => {
    cy.get("[data-testid='product__pagination']").contains("2").click();
    cy.window().its("scrollY").should("equal", 0);
  });

  it("Filtering, searching should add params to request and to browser url", () => {
    cy.wait("@apiProduct").its("request.url").should("contains", "limit=8");

    cy.get("[data-testid='product__search']").type("abcd{enter}");
    cy.wait("@apiProduct");

    cy.get("label").contains("Active").click();
    cy.wait("@apiProduct");

    cy.get("label").contains("Promo").click();

    cy.wait("@apiProduct").its("request.url").as("requestResult");
    const expectedParams = ["search=abcd", "active=true", "promo=true"];

    expectedParams.forEach((item) => {
      cy.get("@requestResult").should("contains", item);
      cy.url().should("contain", item);
    });

    cy.get("@requestResult").should("contains", "limit=8");
  });

  it("Logged user should see avatar", () => {
    cy.login();
    cy.visit(Cypress.env().baseUrl);
    cy.get(`img[alt="user's avatar"]`).should("exist");
  });
});
