const elementFindingPage = require("../utilities/find_elements");
const performAction = require("../utilities/actions_on_elements");
const elementFinder = require('../utilities/helper');
const assert = require("assert");

//below variables declared globally because it will be needed in multiple methods
var currentPageValue = null;
var navigatedPageValue = null;
var docType = null;

const previewDocumentsLocators = [

    { element: "patientDocumentsSections", locator: "css", value: "//span[text()=\"PATIENT DOCUMENTS\"]" },
    { element: "choosePatient", locator: "css", value: "(//div[@class='tss-1d12z92-tableNameAndTask'])[1]" },//to be changed
    { element: "rotateRightButton", locator: "css", value: "//button[@aria-label='Rotate right']" },
    { element: "attachedImage", locator: "id", value: "#png-img" },
    { element: "attachedPdf", locator: "css", value: "(//div[@class='react-pdf__Page__textContent'])[1]" },
    { element: "documentWithMultiplePagess", locator: "css", value: "(//p[contains(text(),'2')])[2]//ancestor::div[2]/div[1]" },
    { element: "paginationButton", locator: "css", value: "//button[@data-testid='paginate']" },
    { element: "forwardButton", locator: "css", value: "//button[@data-testid='next']" },
    { element: "backwardButton", locator: "css", value: "//button[@data-testid='previous']" },
    { element: "pageValue", locator: "id", value: "//div[@aria-label='Page no']/div/input" },
    { element: "scrollButton", locator: "css", value: "//*[@data-testid='UnfoldMoreIcon']" },
    { element: "pageNumberIndicatorInScrollView", locator: "css", value: "div#pdf-page-info" },
    { element: "pageNumberDisplayedInDoc", locator: "css", value: "div#pdf-page-info" },


]

class previewDocument {

    get patientDocumentsSections() { return $(elementFinder(previewDocumentsLocators, "patientDocumentsSections")); }
    get choosePatient() { return $(elementFinder(previewDocumentsLocators, "choosePatient")); }
    get rotateRightButton() { return $(elementFinder(previewDocumentsLocators, "rotateRightButton")); }
    get attachedImage() { return $(elementFinder(previewDocumentsLocators, "attachedImage")); }
    get openDocumentWithMultiplePagesElement() { return $(elementFinder(previewDocumentsLocators, "documentWithMultiplePagess")); }
    get paginationButton() { return $(elementFinder(previewDocumentsLocators, "paginationButton")); }
    get forwardButton() { return $(elementFinder(previewDocumentsLocators, "forwardButton")); }
    get backwardButton() { return $(elementFinder(previewDocumentsLocators, "backwardButton")); }
    get pageValue() { return $(elementFinder(previewDocumentsLocators, "pageValue")); }
    get attachedPdf() { return $(elementFinder(previewDocumentsLocators, "attachedPdf")); }
    get scrollButton() { return $(elementFinder(previewDocumentsLocators, "scrollButton")); }
    get pageNumberIndicatorInScrollView() { return $(elementFinder(previewDocumentsLocators, "pageNumberIndicatorInScrollView")); }



    /*********************************rotate attached document methods starts***************************************************** */
    async searchAndChooseADocument() {

        //below commented code is for search a document and choosing from the results
        //partially implemented

        //  const searchBox = await elementFindingPage.find_element_with_tag_and_value('input','input-txt-search');
        //  await performAction.wait_for_displayed(searchBox);
        //  await performAction.set_value(searchBox,'vision');
        //  await browser.pause(3000);
        //  const chooseDoc = await elementFindingPage.find_element_by_xpath("(//div[@column-name-testid=\"Document\"]/span)[5]");
        //  await performAction.wait_for_displayed(chooseDoc);
        //  await performAction.click_element(chooseDoc);
    }
    async clickrotateRightButton() {

        try {
            await performAction.wait_for_displayed(this.rotateRightButton);
            await performAction.click_element(this.rotateRightButton);
        }
        catch {
            assert.fail("clicking rotate button got failed")
        }
    }

    async checkImageRotated() {
        if (docType.includes("pdf")) {
            const attachedPdf = await elementFindingPage.find_element_by_xpath(`(//div[@class='react-pdf__Page__textContent'])[1]`);
            await performAction.wait_for_displayed(attachedPdf);

            const getStyleValues = await attachedPdf.getAttribute('style');
            var rotateValue = Array.from(getStyleValues.matchAll(/\brotate\(([^deg]*)/g), m => m[1]);
            console.log("image rotated with the degree of " + rotateValue);
            try {
                await assert.equal(rotateValue, "90");
                console.log("yes the pdf is rotated towards right");

            }
            catch {
                await assert.fail("right rotation was not made")
            }

        }
        if (docType.includes("png")) {
            try {
                const getStyleValues = await this.attachedImage.getAttribute('style');
                var rotateValue = Array.from(getStyleValues.matchAll(/\brotate\(([^deg]*)/g), m => m[1]);
                console.log("image rotated with the degree of " + rotateValue);
                try {
                    await assert.equal(rotateValue, "90");
                    console.log("yes the image is rotated towards right");

                } catch {
                    await assert.fail("right rotation was not made")
                }
            }

            catch (error) {
                console.log(error);
            }

        }
    }
    /*********************************rotate attached document methods ends***************************************************** */

    /*********************************page forward methods starts***************************************************** */

    async openDocumentWithMultiplePages() {
        //to open a document with more than one page we are traversing first with number of pages, then retrieving the test of page count
        //checking it is more than one, then choosing the document from which counter is the page is more than one
        try {
            var pageText;
            var splitedPageValue;
            var pageintvalue;
            var counter = 1; //counter is used to traverse through all the documents to check the count of each page
            var documentName;
            var docFound = false;
            //this while loop will run untill it finds a doc with more than one pages
            while (!docFound) {
                //we are traversing with the count of pages present in the documents, so hard coding the locator for this method
                const pageCountElement = await $("(//p[@data-testid='pages_number'])" + "[" + counter + "]");
                await performAction.wait_for_displayed(pageCountElement);
                pageText = await pageCountElement.getText();
                splitedPageValue = await pageText.split(" ");
                pageintvalue = parseInt(splitedPageValue[0]);
                if (pageintvalue > 1) {
                    const documentNameElement = await $("(//div[@class='tss-u9ch7r-tableNameAndTaskLeft']/div/span[1])" + "[" + counter + "]/..");
                    const documentExtension = await $("(//div[@class='tss-u9ch7r-tableNameAndTaskLeft']/div/span[2])" + "[" + counter + "]/..")
                    documentName = await documentNameElement.getText();
                    await performAction.click_element(documentNameElement);
                    docType = await documentExtension.getText();
                    docFound = true; //once multiple page document is found breaking the While loop
                }
                counter = counter + 1; //counter value gets incremented untill document with multiple page is found
            }
        }
        catch {
            assert.fail("cannot able to open document with multiple pages")
        }


    }

    async openPaginationView() {
        try {
            await performAction.wait_for_displayed(this.paginationButton);
            await performAction.click_element(this.paginationButton);
        }
        catch {
            await assert.fail("pagination view was not opened")
        }

    }
    async clickForwardButton() {

        try {
            await performAction.wait_for_displayed(this.forwardButton);
            await performAction.click_element(this.forwardButton);
        }
        catch {
            assert.fail("forward button click operations is failed")
        }

    }

    async checkPageValueBeforeClicking() {

        await performAction.wait_for_displayed(this.pageValue);
        currentPageValue = await performAction.get_element_value(this.pageValue);
        console.log('page number before clicking  button ' + currentPageValue);

    }

    async checkPageValueAfterClicking() {

        await performAction.wait_for_displayed(this.pageValue);
        navigatedPageValue = await performAction.get_element_value(this.pageValue);
        await console.log('page number after clicking button ' + navigatedPageValue);

    }

    async checkPageNavigatedForward() {

        if (currentPageValue != await navigatedPageValue) {
            console.log("page navigated forward")
        }
        else {
            await assert.fail("page navigation was not done");

        }

    }
    /*********************************page forward methods ends***************************************************** */

    /*********************************page backward methods starts***************************************************** */
    async clickBackwardButton() {

        try {
            await performAction.wait_for_displayed(this.backwardButton);
            await performAction.click_element(this.backwardButton);
        }
        catch {
            assert.fail("backward button click operations is failed")
        }

    }
    async checkPageNavigatedBackward() {

        await performAction.wait_for_displayed(this.pageValue);
        navigatedPageValue = await performAction.get_element_value(this.pageValue);
        console.log('page number after clicking backward button ' + navigatedPageValue)

        if (currentPageValue != await navigatedPageValue) {
            console.log("page navigated backward")
        }
        else {
            await assert.fail("page navigation was not done")

        }
    }
    /*********************************page backward methods ends***************************************************** */

    /*********************************pagination details methods starts***************************************************** */

    async validatepaginationView() {

        if (performAction.is_displayed(this.forwardButton)) { console.log("forward button is diplayed") }
        else { assert.fail("forward button is not displayed") }

        if (performAction.is_displayed(this.backwardButton)) { console.log("backward button is diplayed") }
        else { assert.fail("backward button is not displayed") }

        if (performAction.is_displayed(this.pageValue)) { console.log("page number is diplayed") }
        else { assert.fail("page number is not displayed") }
    }
    /*********************************pagination details method ends***************************************************** */

    /*********************************navigation from page to scroll view methods starts*************************** */
    async checkScrollButtonIsDisplayed() {
        await performAction.wait_for_displayed(this.scrollButton);
        if (await performAction.is_displayed(this.scrollButton)) {
            console.log("scroll button is displayed");
        }
        else {
            assert.fail("scroll button is not displayed")
        }
    }
    async clickScrollButton() {
        try {
            await performAction.wait_for_displayed(this.scrollButton);
            await performAction.click_element(this.scrollButton);
        }
        catch {
            assert.fail("clicking scroll button is failed")
        }
    }
    async checkScrollButtonDisappears() {
        if (!this.scrollButton.isDisplayed() == false) {
            console.log("scroll button is disappeared");
        }
        else {
            assert.fail("scroll button is still appearing")
        }
    }
    async checkPaginationDetailsDisappears() {
        if (!this.forwardButton.isDisplayed() == false) { console.log("forward button disappeared") }
        else { assert.fail("forward button is still appearing") }
        if (!this.backwardButton.isDisplayed() == false) { console.log("backward button disappeared") }
        else { assert.fail("backward button is still appearing") }
        if (!this.pageValue.isDisplayed() == false) { console.log("page value indication text field disappeared") }
        else { assert.fail("page value is still appearing") }
    }
    async checkPaginationButtonAppears() {
        if (await performAction.is_displayed(this.paginationButton)) {
            console.log("pagination button is displayed");
        }
        else {
            assert.fail("pagination button is not appeared")
        }
    }
    async checkPageIndicationsDisplayed() {
        if (await performAction.is_displayed(this.pageNumberIndicatorInScrollView)) {
            console.log("individual page number is displayed");
        }
        else {
            assert.fail("page number indicators are not displayed")
        }
    }
    /*********************************navigation from page to scroll view methods ends*************************** */

    /*********************************navigation from scroll to page view methods starts*************************** */
    async checkPageIndicationsNotDisplayed() {
        if (await !performAction.is_displayed(this.pageNumberIndicatorInScrollView) == false) {
            console.log("individual page number is disappeared, view changed to pagination");
        }
        else {
            assert.fail("page number indicators are still appearing")
        }

    }
    async checkPaginationButtonDisappears() {
        if (await !performAction.is_displayed(this.paginationButton) == false) {
            console.log("pagination button is disappeared");
        }
        else {
            assert.fail("pagination button is still appearing")
        }

    }
    async checkPaginationDetailsAppears() {

        if (this.forwardButton.isDisplayed()) { console.log("forward button appears") }
        else {
            assert.fail("forward button is not displayed")
        }
        if (this.backwardButton.isDisplayed()) { console.log("backward button appears") }
        else {
            assert.fail("backward button is not displayed")
        }
        if (this.pageValue.isDisplayed()) { console.log("page value indication text field appears") }
        else {
            assert.fail("page value is not displayed")
        }

    }


}
module.exports = new previewDocument();