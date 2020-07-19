Feature: Day screen

  Scenario: See the create habit form
    Given I am yet to create any habits
    And I navigate to the day screen
    When I choose to create my first habit
    Then I see the create habit form

  Scenario: Cancel from the create habit form
    Given I am yet to create any habits
    And I navigate to the day screen
    And I choose to create my first habit
    When I choose to cancel
    Then I no longer see the create habit form
