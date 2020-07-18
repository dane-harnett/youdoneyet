Feature: Day screen

  Scenario: See an empty day screen
    Given I am yet to create any habits
    When I navigate to the day screen
    Then I see an empty day screen
