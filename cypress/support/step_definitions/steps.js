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

When("I choose to create my first habit", () => {
  cy.get("[data-testid=create-first-habit-link]").click();
});

Then("I see the create habit form", () => {
  cy.get("[data-testid=create-habit-form]");
  cy.get("[data-testid=name-field]");
  cy.get("[data-testid=goal-field]");
  cy.get("[data-testid=cancel-button]");
  cy.get("[data-testid=create-button]");
});

When("I choose to cancel", () => {
  cy.get("[data-testid=cancel-button]").click();
});

Then("I no longer see the create habit form", () => {
  cy.get("[data-testid=create-habit-form]").should("not.exist");
});
