Feature: Day screen

  Scenario: Create my first habit
    Given I am yet to create any habits
    And I navigate to the day screen
    And I choose to create my first habit
    When I enter "Drink more water" for the name
    And I enter 4 for the goal
    And I choose to create
    Then I no longer see the create habit form
    And I see the day screen
    And I see the following habit list:
      | name             | goal | count |
      | Drink more water | 4    | 0     |
