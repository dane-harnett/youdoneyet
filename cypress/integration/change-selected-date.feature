Feature: Day screen

  Scenario: See the current date selected by default
    Given I am yet to create any habits
    And I am logged in
    When I navigate to the day screen
    Then I see the "current" date is the selected date

  Scenario Outline: Change the selected date to the <direction> date
    Given I am yet to create any habits
    And I am logged in
    And I navigate to the day screen
    When I choose to change the selected date to the "<direction>" date
    Then I see the "<direction>" date is the selected date

    Examples:
      | direction |
      | previous  |
      | next      |
