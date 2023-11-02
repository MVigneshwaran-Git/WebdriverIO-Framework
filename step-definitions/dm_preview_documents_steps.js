const { Given, When, Then } = require('@wdio/cucumber-framework');

const vaDocLoginPage = require("../pageobjects/dm_login_page.js");
const previewDocumentPage = require("../pageobjects/dm_preview_documents_page");
const loginInputData = require("../inputdata/loginPagedata.json");

/*********************************Login Steps starts***************************************************** */
//Given user is on login page
Given('user is on the login page', async function () {

    var url = loginInputData.logintestdata.baseurl;
    await browser.url(url);
    browser.maximizeWindow();
    await vaDocLoginPage.clickloginLink();
});

// When user enters "username" and "password" and "role"
When('user enters {string} and {string} and {string}', async function (string, string2, string3) {

    await vaDocLoginPage.enterCredentials(loginInputData.logintestdata.username, loginInputData.logintestdata.password, loginInputData.logintestdata.userrole);
    await vaDocLoginPage.selectRole();
    await vaDocLoginPage.selectButton();

});
/*********************************Login Steps ends***************************************************** */

/*********************************rotate attached document steps starts***************************************************** */
//Given the user is previewing the attached document
Given('the user is previewing the attached document', async function () {

    await previewDocumentPage.openDocumentWithMultiplePages();

});

//When the user clicks the rotate right side button   
When('the user clicks the rotate right side button', async function () {

    await previewDocumentPage.clickrotateRightButton();

});
//Then The image is rotated towards right side  
Then('The image is rotated towards right side', async function () {

    await previewDocumentPage.checkImageRotated();

});

/*********************************rotate attached document steps ends***************************************************** */

/*********************************page forward steps starts***************************************************** */

//Given user is previewing  a multiple pages document
Given('user is previewing a multiple pages document', async function () {
    await previewDocumentPage.openDocumentWithMultiplePages();
    await previewDocumentPage.openPaginationView();//------------------------------------------------------------------------
});
//When user click on forward button
When('user click on forward button', async function () {
    await previewDocumentPage.checkPageValueBeforeClicking();
    await previewDocumentPage.clickForwardButton();


});
//Then it takes forwards by one page on the document
Then('it takes forwards by one page on the document', async function () {
    await previewDocumentPage.checkPageValueAfterClicking();
    await previewDocumentPage.checkPageNavigatedForward();
});

/*********************************page forward steps ends***************************************************** */

/*********************************page backward steps starts***************************************************** */

//Given user is previewing a multiple paged document
// since given is already defined we are not defining here

//When user click on backward button from succeeding page
When('user click on backward button from succeeding page', async function () {
    await previewDocumentPage.clickForwardButton();
    await previewDocumentPage.checkPageValueBeforeClicking();

    await previewDocumentPage.clickBackwardButton();
    await previewDocumentPage.checkPageValueAfterClicking();
});
//Then it takes backwards by one page on the document
Then('it takes backwards by one page on the document', async function () {
    await previewDocumentPage.checkPageNavigatedBackward();
});

/*********************************page backward steps ends***************************************************** */

/*********************************pagination view steps starts********************************************* */

//Given user is previewing a multiple pages document
// since given is already defined we are not defining here

//When user click on pagination button
When('user click on pagination button', async function () {

    await previewDocumentPage.checkScrollButtonIsDisplayed();
});

//Then Next, Previous, scroll, page indicator displays inplace of pagination button.
Then('Next, Previous, scroll, page indicator displays inplace of pagination button', async function () {

    await previewDocumentPage.validatepaginationView();
});
/*********************************pagination view steps ends********************************************* */

/*********************************Navigation from page to scroll view steps starts***************** */

//Given the scroll button is displayed
Given('the scroll button is displayed', async function () {
    await previewDocumentPage.openDocumentWithMultiplePages();//manadatory background steps
    await previewDocumentPage.openPaginationView();//manadatory background steps
    await previewDocumentPage.checkScrollButtonIsDisplayed();
});

//When user select the scroll button
When('user select the scroll button', async function () {
    await previewDocumentPage.clickScrollButton();
});

//Then the scroll button disappears
Then('the scroll button disappears', async function () {
    await previewDocumentPage.checkScrollButtonDisappears();
});

//And arrows to skip pages, with a number indicator for the page number disappears
Then('arrows to skip pages, with a number indicator for the page number disappears', async function () {
    await previewDocumentPage.checkPaginationDetailsDisappears();
});

//And the pagination button appears
Then('the pagination button appears', async function () {
    await previewDocumentPage.checkPaginationButtonAppears();
});
//And the total number of pages and indication of what page user is on is displayed above the document
Then('the total number of pages and indication of what page user is on is displayed above the document', async function () {
    await previewDocumentPage.checkPageIndicationsDisplayed();
});

/*********************************Navigation from page to scroll view steps ends***************** */

/*********************************Navigation to pagination view from scroll view steps starts***************** */

// Given user is previewing a multiple pages document
// since given is already defined we are not defining here

//And there are more than one pages within a document
// Given('there are more than one pages within a document', async function () {
//     previewDocumentPage.openDocumentWithMultiplePages();

// });

//When user select the pagination button
When('user select the pagination button', async function () {
    await previewDocumentPage.openPaginationView();
});

//Then the preview changes from scroll view to pagination view
Then('the preview changes from scroll view to pagination view', async function () {
    previewDocumentPage.checkPageIndicationsNotDisplayed();
});

//And the pagination button disappears
Then('the pagination button disappears', async function () {
    previewDocumentPage.checkPaginationButtonDisappears();
});

//And the scroll button appears
Then('the scroll button appears', async function () {
    previewDocumentPage.checkScrollButtonIsDisplayed();
});

//And arrows to skip pages are displayed, with a number indicator for the page number displayed
Then('arrows to skip pages are displayed, with a number indicator for the page number displayed', async function () {
    previewDocumentPage.checkPaginationDetailsAppears()
});

/*********************************Navigation to pagination view from scroll view steps ends***************** */