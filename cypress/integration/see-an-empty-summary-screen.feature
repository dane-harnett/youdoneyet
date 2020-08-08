Feature: Summary screen

  Scenario: See an empty summary screen
    Given I am yet to create any habits
    When I navigate to the summary screen
    Then I see the summary screen
