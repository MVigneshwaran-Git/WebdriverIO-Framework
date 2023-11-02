const elementFindingPage = require("../utilities/find_elements"); //as of now not using multi ways to find elements class // can be used in future
const performAction = require("../utilities/actions_on_elements"); // perform action holds methods used to perform actions on webelements
const elementFinder = require('../utilities/helper'); //using this helper.js class to find the elements from webpage
const assert = require('assert');
const { AssertionError } = require("assert");
const loginLocators = [
    { element: "loginLink", locator: "id", value: "button.mui-1ujwixi" },
    { element: "usernameField", locator: "id", value: "input#email" },
    { element: "passwordField", locator: "id", value: "input#password" },
    { element: "signinButton", locator: "id", value: "button.css-14s8p65" },
    { element: "roleButton", locator: "id", value: "div#role-select" },
    { element: "roleOptionFromDropdown", locator: "css", value: "//li[text()='Dundee Practice']" },
    { element: "selectRoleButton", locator: "id", value: "button.css-14s8p65" },
]
class VaDocLoginPage {

    get loginLinkButton() { return $(elementFinder(loginLocators, "loginLink")); }
    get usernameElement() { return $(elementFinder(loginLocators, "usernameField")); }
    get passwordElement() { return $(elementFinder(loginLocators, "passwordField")); }
    get signInButtonElement() { return $(elementFinder(loginLocators, "signinButton")); }
    get roleButtonElement() { return $(elementFinder(loginLocators, "roleButton")); }
    get roleDropdownElement() { return $(elementFinder(loginLocators, "roleOptionFromDropdown")); }
    get selectRoleElement() { return $(elementFinder(loginLocators, "selectRoleButton")); }

    async clickloginLink() {
        await this.loginLinkButton.click();                   //will click login button will trigger to open the login window
        var parentwindow = await browser.getWindowHandle();
        // await browser.pause(4000);
        var newWindow = await browser.getWindowHandles();     //changing the window handle to login window
        for (var i = 0; i < newWindow.length; i++) {
            if (await newWindow[i] != parentwindow) {
                await browser.switchToWindow(newWindow[i])
            }
        }
        try {
            var title = await browser.getTitle();
            await assert.equal(title, "Login Helper");
        }
        catch {
            await assert.fail("Login window is not opened")
        }

    }
    async enterCredentials(username_value, password_value, userrole_value) {
        try {
            const username = await this.usernameElement
            await performAction.wait_for_displayed(username);
            await performAction.set_value(username, username_value);
            const password = await this.passwordElement
            await performAction.set_value(password, password_value);


            const signInButton = await this.signInButtonElement
            await performAction.wait_for_enabled(signInButton);
            await performAction.click_element(signInButton);

        }
        catch {
            assert.fail("Entering credentials while login got failed")
        }



    }
    async selectRole() {

        try {
            const roleSelect = await this.roleButtonElement
            await performAction.wait_for_displayed(roleSelect)
            await performAction.click_element(roleSelect);

            //selecting the role value is not dynamically done, need to implement
            const role = await this.roleDropdownElement
            await performAction.wait_for_displayed(role);
            await performAction.click_element(role);
        }
        catch {
            assert.fail("Unable to select user role")
        }
    }

    async selectButton() {

        const submitButton = await this.selectRoleElement;
        await performAction.wait_for_displayed(submitButton);
        await performAction.click_element(submitButton)

        var newWindow = await browser.getWindowHandles();         //after login navigating back to main window from login window
        for (var w = 0; w < newWindow.length; w++) {
            await browser.switchToWindow(newWindow[w]);
            var t = await browser.getTitle();
            if (t.includes("Document Management")) {
                console.log('Switching back to Main window');
                break;
            }
            break;
        }
        try {
            var title = await browser.getTitle();
            await assert.equal(title, "Document Management");
        }
        catch {
            await assert.fail("from login window to main window is not opened")
        }


    }

}
module.exports = new VaDocLoginPage();