import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

const appAddress = 'http://localhost:5173';

export const options = {
    scenarios: {
        browser: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 1,
            maxDuration: '2m',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    const page = await browser.newPage();

    await page.goto(appAddress);
    await page.waitForSelector('input[placeholder="First Name"]');

    const firstName = `TestFirstName-${Math.random().toString(36).substring(7)}`;
    const lastName = `TestLastName-${Math.random().toString(36).substring(7)}`;
    const age = 69;

    await page.locator('input[placeholder="First Name"]').type(firstName);
    await page.locator('input[placeholder="Last Name"]').type(lastName);
    await page.locator('input[placeholder="Age"]').type(age.toString());
    await page.locator('#createButton').click();

    // Wait for the user to be created and the table to update.
    await page.waitForSelector('table tbody tr:last-child td:first-child', { timeout: '10s' });

    // Extract the ID of the last created user.
    await page.reload();
    const userId = await page.locator('table tbody tr:last-child td:first-child').textContent();

    // Type the user ID into the delete input and click the delete button.
    await page.locator('input[placeholder="Enter User ID to Delete"]').type(userId);
    await page.locator('#deleteButton').click(); // Using text selector for robustness

    await page.close();
}