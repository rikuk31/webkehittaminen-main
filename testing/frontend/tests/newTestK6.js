import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

// Define the application URL
const appAddress = 'http://localhost:5173';

export const options = {
    scenarios: {
        browser: {
            executor: 'shared-iterations', // Each VU shares the workload across iterations
            vus: 5, // Number of virtual users running the test concurrently
            iterations: 10, // Total number of test iterations across all VUs
            maxDuration: '2m', // Maximum test duration before it stops
            options: {
                browser: {
                    type: 'chromium', // Specifies the browser type (Chromium, Firefox, WebKit)
                },
            },
        },
    },
};

export default async function () {
    const page = await browser.newPage();
    
    try {
        await page.goto(appAddress);

        const firstName = Math.random().toString(36).substring(7);
        const lastName = Math.random().toString(36).substring(7);
        const age = Math.random();

        await page.locator('input[placeholder="First Name"]').type(firstName);
        await page.locator('input[placeholder="Last Name"]').type(lastName);
        await page.locator('input[placeholder="Age"]').type(age);

        await page.locator('button[type="submitCreate"]').click(); // Corrected button type
        console.log("Creating user with first name: " + firstName);

        await page.reload();
        await page.waitForSelector('li');

        const listItems = await page.$$('li');
        check(listItems, {
            'Found li elements': (items) => items.length > 0,
        });

        for (const item of listItems) {
            const textContLi = await item.textContent();
            
            // Extract first name
            const firstNameExtracted = textContLi.split(', First Name: ')[1].split(', Last Name: ')[0].trim();
        
            // Compare the extracted first name with the generated first name
            if (firstNameExtracted === firstName) {
                // Log the deletion message with only the first name
                console.log(`Deleting user with name: ${firstNameExtracted}`);
        
                const id = await item.getAttribute('id');
                const deleteId = `#delete-${id.split('-')[1]}`;  // Ensure the selector is properly formatted
        
                // Wait for the delete button to be visible and clickable
                await page.waitForSelector(deleteId);
                await page.locator(deleteId).click();
            }
        }
        

    } finally {
        await page.close();
    }

    sleep(1);
}
