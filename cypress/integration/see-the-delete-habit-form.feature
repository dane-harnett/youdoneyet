Feature: Day screen

  Scenario: See the delete habit form
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 2    |
    And I am logged in
    And I navigate to the day screen
    When I choose to delete "Drink more water"
    Then I see the delete habit form

  Scenario: Cancel from the delete habit form
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 2    |
    And I am logged in
    And I navigate to the day screen
    When I choose to delete "Drink more water"
    When I choose to cancel
    Then I no longer see the delete habit form
