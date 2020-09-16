Feature: Day screen

  Scenario: Log a habit record
    Given I have the following habits:
      | name             | goal | count |
      | Drink more water | 1    | 0     |
    And I am logged in
    When I log a record for "Drink more water"
    Then I see the following habit list:
      | name             | goal | count |
      | Drink more water | 1    | 1     |

  Scenario: Log a habit record with a count of more than one
    Given I have the following habits:
      | name             | goal | count |
      | Drink more water | 3    | 0     |
    And I am logged in
    When I log a record for "Drink more water"
    And I enter 2 for the count
    And I choose to log the count
    Then I see the following habit list:
      | name             | goal | count |
      | Drink more water | 3    | 2     |
