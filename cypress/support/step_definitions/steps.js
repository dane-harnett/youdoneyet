import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { add, format, sub } from "date-fns";

Given("I am yet to create any habits", () => {
  cy.clearLocalStorage();
});

Given("I have the following habits:", (dataTable) => {
  const habits = dataTable.rawTable.slice(1).map((line) => ({
    id: line[0],
    name: line[0],
    goal: parseInt(line[1], 10),
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
    cy.get("[data-testid=habit-name]").contains(line[0]);
    cy.get("[data-testid=habit-goal]").contains(line[1]);
    cy.get("[data-testid=habit-count]").contains(line[2] || "0");
  });
});

Then("I see that {string} is complete", (habitName) => {
  cy.get(`[data-testid="${habitName}"]`).should(
    "have.css",
    "background-color",
    "rgb(129, 199, 132)"
  );
  cy.get(`[data-testid="${habitName}"]`).within(() => {
    cy.get("[data-testid=completed-icon]");
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

Then("I see the {string} date is the selected date", (targetDate) => {
  const targetDateMap = {
    current: new Date(),
    previous: sub(new Date(), { days: 1 }),
    next: add(new Date(), { days: 1 }),
  };
  cy.get("[data-testid=selected-date] [data-testid=date]").contains(
    format(targetDateMap[targetDate], "EEEE, d LLLL yyyy")
  );
});

When(
  "I choose to change the selected date to the {string} date",
  (targetDate) => {
    cy.get(`[data-testid=${targetDate}-date-button]`).click();
  }
);
