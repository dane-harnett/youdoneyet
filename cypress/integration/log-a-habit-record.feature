Feature: Day screen

  Scenario: Log a habit record
    Given I have the following habits:
      | name             | goal | count |
      | Drink more water | 4    | 0     |
    And I navigate to the day screen
    When I log a record for "Drink more water"
    Then I see the following habit list:
      | name             | goal | count |
      | Drink more water | 4    | 1     |
