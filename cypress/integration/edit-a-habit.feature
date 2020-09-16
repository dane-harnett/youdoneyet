Feature: Day screen

  Scenario: Edit a habit
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 2    |
    And I am logged in
    And I navigate to the day screen
    When I choose to edit "Drink more water"
    And I enter "Hydrate" for the name
    And I enter 8 for the goal
    When I choose to save
    Then I no longer see the edit habit form
    And I see the day screen
    And I see the following habit list:
      | name    | goal | count |
      | Hydrate | 8    | 0     |
