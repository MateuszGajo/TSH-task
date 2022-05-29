/// <reference types="Cypress" />

describe("Login page", () => {
  const dbUser = {
    username: "test123",
    password: "test123",
  };
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl + "/login");
    cy.intercept("POST", "users/login").as("apiLogin");
  });

  it("Form submit should fire request", () => {
    const user = {
      username: "username",
      password: "password",
    };
    cy.get("input[name='username']").type(user.username);
    cy.get("input[name='password']").type(user.password);
    cy.contains("log in", { matchCase: false }).click();
    cy.wait("@apiLogin").then(({ request }) => {
      expect(request.body).eql({
        username: user.username,
        password: user.password,
      });
    });
  });

  it("User doesn't exist error should be handled", () => {
    const user = {
      username: "username",
      password: "password",
    };
    cy.get("input[name='username']").type(user.username);
    cy.get("input[name='password']").type(user.password);
    cy.intercept("POST", "users/login", {
      statusCode: 404,
      body: {
        message: "No user found",
      },
    });

    cy.contains("log in", { matchCase: false }).click();

    cy.contains("No user found");
  });

  it("User creds error should be handled", () => {
    const user = {
      username: "username",
      password: "password",
    };
    cy.get("input[name='username']").type(user.username);
    cy.get("input[name='password']").type(user.password);
    cy.intercept("POST", "users/login", {
      statusCode: 401,
      body: {
        message: "Invalid user or password",
      },
    });
    cy.contains("log in", { matchCase: false }).click();

    cy.contains("Invalid user or password");
  });

  it("Success login should redirect page", () => {
    cy.get("input[name='username']").type(dbUser.username);
    cy.get("input[name='password']").type(dbUser.password);

    cy.contains("log in", { matchCase: false }).click();

    cy.url().should("not.contain", "login");
  });

  it("Success login expect token to be saved", () => {
    cy.get("input[name='username']").type(dbUser.username);
    cy.get("input[name='password']").type(dbUser.password);

    cy.contains("log in", { matchCase: false }).click();
    cy.origin(Cypress.env().baseUrl, () => {
      expect(localStorage.getItem("token")).not.to.be.null;
    });
  });
});

describe("Auth redirects", () => {
  it("Logged user shouldn't be abble to see login page", () => {
    cy.visit(Cypress.env().baseUrl + "/");
    cy.login();
    cy.visit(Cypress.env().baseUrl + "/login");
    cy.url().should("not.contain", "login");
  });
});
