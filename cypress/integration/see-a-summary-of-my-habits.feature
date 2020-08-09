Feature: Summary screen

  Scenario: See a summary of my habits
    Given I have the following habits:
      | name             | goal |
      | Drink more water | 1    |
    And I have completed "Drink more water" the following days "NNNNNNYYNYYNNYYNYNNYY"
    When I navigate to the summary screen
    Then I see the following summaries:
      | name             | records               |
      | Drink more water | NNNNNNYYNYYNNYYNYNNYY |
