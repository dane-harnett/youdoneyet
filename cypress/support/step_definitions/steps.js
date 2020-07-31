import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I am yet to create any habits", () => {
  cy.clearLocalStorage();
});

Given("I have the following habits:", (dataTable) => {
  const habits = dataTable.rawTable.slice(1).map((line) => ({
    id: "test",
    name: line[0],
    goal: line[1],
  }));
  window.localStorage.setItem("habits", JSON.stringify(habits));
});

When("I navigate to the day screen", () => {
  cy.visit("/");
});

When("I reload the page", () => {
  cy.reload();
});

Then("I see the day screen", () => {
  cy.get("[data-testid=day-screen]");
  cy.get("[data-testid=app-header]");
  cy.get("[data-testid=navigation-tabs]");
  cy.get("[data-testid=selected-date]");
});

Then("I see an empty habit list", () => {
  cy.get("[data-testid=empty-habit-list]");
});

Then("I see the following habit list:", (dataTable) => {
  cy.get("[data-testid=habit-list]");
  dataTable.rawTable.slice(1).forEach((line) => {
    cy.get("[data-testid=habit-list]").contains(`Name: ${line[0]}`);
    cy.get("[data-testid=habit-list]").contains(`Goal: ${line[1]}`);
    cy.get("[data-testid=habit-list]").contains(`Count: ${line[2] || 0}`);
  });
});

When("I choose to create my first habit", () => {
  cy.get("[data-testid=create-first-habit]").click();
});

When("I choose to create a new habit", () => {
  cy.get("[data-testid=create-new-habit]").click();
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

When("I enter {string} for the name", (name) => {
  cy.get("[data-testid=name-field]").type(name);
});

When("I enter {int} for the goal", (goal) => {
  cy.get("[data-testid=goal-field]").type(`{backspace}${goal}`);
});

When("I choose to create", () => {
  cy.get("[data-testid=create-button]").click();
});

When(`I log a record for "Drink more water"`, () => {
  cy.get("[data-testid=log-button]").click();
});
