Feature: Day screen

  Scenario: See an empty day screen
    Given I am yet to create any habits
    And I am logged in
    When I navigate to the day screen
    Then I see the day screen
    And I see an empty habit list
