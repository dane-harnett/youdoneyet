Feature: Day screen

  Scenario: Delete a habit
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 2    |
      | Push ups         | 100  |
    And I am logged in
    And I navigate to the day screen
    When I choose to delete "Drink more water"
    When I choose to confirm delete
    Then I no longer see the delete habit form
    And I see the day screen
    And I see the following habit list:
      | name     | goal | count |
      | Push ups | 100  | 0     |
