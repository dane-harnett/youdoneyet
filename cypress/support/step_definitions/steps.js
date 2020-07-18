import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I am yet to create any habits", () => {
  cy.clearLocalStorage();
});

When("I navigate to the day screen", () => {
  cy.visit("/");
});

Then("I see an empty day screen", () => {
  cy.get("[data-testid=day-screen]");
  cy.get("[data-testid=app-header]");
  cy.get("[data-testid=navigation-tabs]");
  cy.get("[data-testid=selected-date]");
  cy.get("[data-testid=empty-habit-list]");
});
