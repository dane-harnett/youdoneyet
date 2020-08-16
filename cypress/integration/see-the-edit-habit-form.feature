Feature: Day screen

  Scenario: See the edit habit form
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 2    |
    And I navigate to the day screen
    When I choose to edit "Drink more water"
    Then I see the edit habit form
    And I see the name is "Drink more water"
    And I see the goal is 2

  Scenario: Cancel from the edit habit form
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 2    |
    And I navigate to the day screen
    When I choose to edit "Drink more water"
    When I choose to cancel
    Then I no longer see the edit habit form
