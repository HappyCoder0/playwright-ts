import {type Page} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    private jobCountLocator = "[class=\'job-summary-desc-info-jobs\']";
    private jobTitleLocator = "div[id='all']>section>div>a>div>div[class='jb-title']";

    constructor(page: Page) {
        this.page = page;
    }

    async getJobCount() {
        return await this.page.locator(this.jobCountLocator).textContent();
    }

    async checkIfTitleExists( expectedTitle) {
        // Check if any job title contains expected title
        return await this.page.locator(this.jobTitleLocator)
            .allTextContents()
            .then((jobTitles) => jobTitles.some((title) => title.includes(expectedTitle)));
    }

    async goto(url) {
        await this.page.goto(url);
    }
}