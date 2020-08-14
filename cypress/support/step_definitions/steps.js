import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { add, format, sub } from "date-fns";

Given("I am yet to create any habits", () => {
  cy.clearLocalStorage();
});

Given("I am yet to save my theme mode", () => {
  cy.clearLocalStorage("theme_mode");
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

When("I navigate to the summary screen", () => {
  cy.visit("/summary");
});

When("I choose to navigate to the {string} screen", (screenName) => {
  cy.get(`[data-testid=${screenName}-tab]`).click();
});

When("I reload the page", () => {
  cy.reload();
});

Then("I see the day screen", () => {
  cy.get("[data-testid=day-screen]");
  cy.get("[data-testid=app-header]");
  cy.get("[data-testid=navigation-tabs]");
  cy.get("[data-testid=selected-date]");
  cy.get("[data-testid=day-tab]").should("have.attr", "aria-selected", "true");
});

Then("I see the summary screen", () => {
  cy.get("[data-testid=summary-screen]");
  cy.get("[data-testid=app-header]");
  cy.get("[data-testid=navigation-tabs]");
  cy.get("[data-testid=summary-tab]").should(
    "have.attr",
    "aria-selected",
    "true"
  );
});

Then("I see an empty habit list", () => {
  cy.get("[data-testid=empty-habit-list]");
});

Then("I see an empty summary list", () => {
  cy.get("[data-testid=empty-summary-list]");
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
    "rgb(154, 210, 156)"
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

Given(
  "I have completed {string} the following days {string}",
  (habitId, records) => {
    const habitLogs = records
      .split("")
      .reverse()
      .reduce((acc, recordValue, index) => {
        if (recordValue === "N") {
          return acc;
        } else {
          return acc.concat([
            {
              habitId,
              count: 1,
              dateLogged: format(
                sub(new Date(), { days: index }),
                "yyyy-MM-dd"
              ),
            },
          ]);
        }
      }, []);
    window.localStorage.setItem("habit_logs", JSON.stringify(habitLogs));
  }
);

Then("I see the following summaries:", (dataTable) => {
  cy.get("[data-testid=summary-list]");
  dataTable.rawTable.slice(1).forEach((line) => {
    cy.get("[data-testid=habit-name]").contains(line[0]);
    const records = line[1].split("");
    cy.get("[data-testid=records]");
    cy.get("[data-testid=record-item]").each((recordItem, index) => {
      cy.log(index);
      cy.wrap(recordItem).should("have.attr", "data-completed", records[index]);
    });
  });
});

Then("I see that I am in {string} mode", (themeMode) => {
  cy.get(`[data-theme-mode=${themeMode}]`);
});
When("I choose to change to {string} mode", (themeMode) => {
  cy.get(`[data-testid=theme-mode-toggle-button]`).click();
});
