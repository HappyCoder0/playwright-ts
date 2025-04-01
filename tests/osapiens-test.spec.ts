import { test, expect } from '@playwright/test';
import {HomePage} from "../pages/HomePage";
import {testData} from "./testData";

/** Improvement idea: The below test can be improved by:
 * Page-Object model for re-usability of locators, methods
 * Storing test data in a Json and passing them in tests
 * */

test('should have at least 1 job title with `Quality`', async ({ page }) => {
    let checkTitleExists = false;
    // Navigate to URL
    await page.goto('https://osapiens.jobs.personio.com/');

    // Print number of open jobs
    const jobCount = await page.locator('[class=\'job-summary-desc-info-jobs\']').textContent();
    console.log("Total number of open jobs is " + jobCount);

    // Check if expected job Title exists
    const jobTitleLocator = page.locator("div[id='all']>section>div>a>div>div[class='jb-title']");
    const jobTitlesElementsList = await jobTitleLocator.all();
    for(const row of jobTitlesElementsList) {
        const jobTitle = await row.textContent();
        checkTitleExists = jobTitle.includes("Quality");
        if(checkTitleExists == true) {
            break;
        }
    }

    /** Improvement idea: The above code can be optimised using Fluent/chain approach as below*/
    // checkTitleExists = await jobTitleLocator.locator("text=Quality").count() > 0;

    expect(checkTitleExists).toBe(true);

});


test('Page-Object Model - should have at least 1 job title with `Sales`', async ({ page }) => {
    // Initialise page-objects
    const homePage = new HomePage(page);
    // Navigate to URL
    await homePage.goto(testData.baseUrl);
    // Print number of open jobs
    console.log("Total number of open jobs is " + await homePage.getJobCount());
    // Verify that job Title exists
    expect(await homePage.checkIfTitleExists("Sales")).toBe(true);

});