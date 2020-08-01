Feature: Day screen

  Scenario: See the current date selected by default
    Given I am yet to create any habits
    When I navigate to the day screen
    Then I see the "current" date is the selected date

  Scenario: Change the selected date to the previous date
    Given I am yet to create any habits
    And I navigate to the day screen
    When I choose to change the selected date to the "previous" date
    Then I see the "previous" date is the selected date

  Scenario: Change the selected date to the next date
    Given I am yet to create any habits
    And I navigate to the day screen
    When I choose to change the selected date to the "next" date
    Then I see the "next" date is the selected date
