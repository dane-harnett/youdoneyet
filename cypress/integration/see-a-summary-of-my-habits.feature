Feature: Summary screen

  Scenario: See a summary of my habits
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 1    |
    And I have completed "Drink more water" the following days "NNNNNNYYNYYNNYYNYNNYY"
    And I am logged in
    When I navigate to the summary screen
    Then I see the following summaries:
      | name             | records               | streak |
      | Drink more water | NNNNNNYYNYYNNYYNYNNYY | 2      |


# Scenario: See a habit I just created on the summary screen
#   Given I am yet to create any habits
#   And I am logged in
#   And I navigate to the summary screen
#   And I choose to navigate to the "day" screen
#   And I see the day screen
#   And I choose to create my first habit
#   And I enter "Drink more water" for the name
#   And I enter 4 for the goal
#   And I choose to create
#   When I choose to navigate to the "summary" screen
#   Then I see the following summaries:
#     | name             | records               | streak |
#     | Drink more water | NNNNNNNNNNNNNNNNNNNNN | 0      |
