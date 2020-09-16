Feature: Day screen

  Scenario: Completing a habit
    Given I have the following habits:
      | name             | goal | count |
      | Drink more water | 1    | 0     |
    And I am logged in
    And I navigate to the day screen
    When I log a record for "Drink more water"
    Then I see that "Drink more water" is complete
