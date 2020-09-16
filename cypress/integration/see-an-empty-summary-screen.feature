Feature: Summary screen

  Scenario: See an empty summary screen
    Given I am yet to create any habits
    And I am logged in
    When I navigate to the summary screen
    Then I see the summary screen
    And I see an empty summary list
