Feature: Day screen

  Scenario: Create additional habits
    Given I am yet to create any habits
    And I navigate to the day screen
    And I choose to create my first habit
    And I enter "Drink more water" for the name
    And I enter 4 for the goal
    And I choose to create
    And I no longer see the create habit form
    And I see the day screen
    When I choose to create a new habit
    And I enter "Burpees" for the name
    And I enter 10 for the goal
    And I choose to create
    Then I no longer see the create habit form
    And I see the day screen
    And I see the following habit list:
      | name             | goal |
      | Drink more water | 4    |
      | Burpees          | 10   |
