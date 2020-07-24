Feature: Day screen

  Scenario: Persist habits
    Given I am yet to create any habits
    And I navigate to the day screen
    And I choose to create my first habit
    And I enter "Drink more water" for the name
    And I enter 4 for the goal
    And I choose to create
    And I no longer see the create habit form
    And I see the day screen
    And I see the following habit list:
      | name             | goal |
      | Drink more water | 4    |
    When I reload the page
    Then I see the day screen
    And I see the following habit list:
      | name             | goal |
      | Drink more water | 4    |
