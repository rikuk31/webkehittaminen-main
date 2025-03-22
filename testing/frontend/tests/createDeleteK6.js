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
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

        await page.goto(appAddress);

        const firstName = "Testi";
        const lastName = "Testaaja";
        const age = 69;

        await page.locator('input[placeholder="First Name"]').type(firstName);
        await page.locator('input[placeholder="Last Name"]').type(lastName);
        await page.locator('input[placeholder="Age"]').type(age.toString());
        //await page.locator('button[type="submitCreate"]').click();


        const tableRows = await page.$$('table tbody tr');
        const initialRowCount = tableRows.length;

        for (const row of tableRows) {
            
            const cells = await row.$$('td');

            const rowFirstName = await cells[1].textContent(); // Await the textContent
            const rowLastName = await cells[2].textContent(); // Await the textContent
            const rowAge = await cells[3].textContent();

            console.log("First name: " + await rowFirstName);
            console.log("Last Name: " + await rowLastName);
            console.log("Age: "+ await rowAge);

            /*if (cells.length >= 4) {


                if (rowFirstName === firstName && rowLastName === lastName && rowAge === age.toString()) {
                    const deleteButton = await row.locator('button[data-testid="delete-button"]').first();
                    await deleteButton.click();

                    const newTableRows = await page.$$('table tbody tr');
                    check(newTableRows, {
                        'Row count reduced': (rows) => rows.length < initialRowCount,
                    });
                    break;
                }
            }*/
        }
        await page.close();
    sleep(1);
}