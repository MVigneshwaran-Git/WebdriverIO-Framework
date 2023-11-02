Feature: Checking the functionalities in document previewing page

    Background: Background name: As a user, I want to be logged in
        Given user is on the login page
        When user enters "username" and "password" and "role"
    @DM-100
    Scenario: check whether image is rotated when user clicks rotate button
        Given the user is previewing the attached document
        When the user clicks the rotate right side button
        Then The image is rotated towards right side
    @DM-101
    Scenario: check whether document page is changed to the next page when forward button is clicked
        Given user is previewing a multiple pages document
        When user click on forward button
        Then it takes forwards by one page on the document
    @DM-102
    Scenario: check whether document page is changed to the next page when backward button is clicked
        Given user is previewing a multiple pages document
        When user click on backward button from succeeding page
        Then it takes backwards by one page on the document
    @DM-103
    Scenario: check the pagination details are displayed from pagination view
        Given user is previewing a multiple pages document
        When user click on pagination button
        Then Next, Previous, scroll, page indicator displays inplace of pagination button

    @DM-104
    Scenario: checking scroll view details after navigating back from pagination view
        Given the scroll button is displayed
        When user select the scroll button
        Then the scroll button disappears
        And arrows to skip pages, with a number indicator for the page number disappears
        And the pagination button appears
        And the total number of pages and indication of what page user is on is displayed above the document
    @DM-105
    Scenario: checking pagination view details after navigating back from scroll view
        Given user is previewing a multiple pages document
        When user select the pagination button
        Then the preview changes from scroll view to pagination view
        And the pagination button disappears
        And the scroll button appears
        And arrows to skip pages are displayed, with a number indicator for the page number displayed






