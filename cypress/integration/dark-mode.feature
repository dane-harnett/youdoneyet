Feature: Dark mode

  Scenario: Light mode by default
    Given I am yet to create any habits
    When I navigate to the day screen
    Then I see that I am in "light" mode

  Scenario: Change from light mode to dark mode
    Given I am yet to create any habits
    And I navigate to the day screen
    When I choose to change to "dark" mode
    Then I see that I am in "dark" mode

  Scenario: Change from dark mode to light mode
    Given I am yet to create any habits
    And I navigate to the day screen
    And I choose to change to "dark" mode
    When I choose to change to "light" mode
    Then I see that I am in "light" mode
