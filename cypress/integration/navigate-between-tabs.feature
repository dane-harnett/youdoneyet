Feature: Navigation

  Scenario: Navigate from day screen to summary screen
    Given I am yet to create any habits
    And I navigate to the day screen
    When I choose to navigate to the "summary" screen
    Then I see the summary screen

  Scenario: Navigate from summary screen to day screen
    Given I am yet to create any habits
    And I navigate to the summary screen
    When I choose to navigate to the "day" screen
    Then I see the day screen
