import { test, expect } from '@playwright/test';

// Define the base URL for the application
const appAddress = 'http://localhost:5173';

/**
 * Test Case: The app should display the title
 * - Opens the application in the browser
 * - Verifies that the main title (`<h1>`) contains "User Management"
 * - Pauses execution (for debugging purposes if running in headed mode)
 */
test('The app should display the title', async ({ page }) => {
    // Navigate to the application's home page
    await page.goto(appAddress);

    // Find the <h1> element and check if it contains the expected text "User Management"
    await expect(page.locator('h1')).toHaveText('User Management');

    // Pause execution for debugging when running Playwright in headed mode
    // Allows manual inspection of the browser state
    await page.pause();
});

test('Submitting user information should return OK response', async ({ page }) => {
    // Navigate to the application
    await page.goto(appAddress);
  
    // Fill in the form
    await page.fill('input[placeholder="First Name"]', 'John');
    await page.fill('input[placeholder="Last Name"]', 'Doe');
    await page.fill('input[placeholder="Age"]', '30');
  
    // Click the submit button
    await page.click('button:has-text("Create")');
  
    // Expect a success message
    await expect(page.locator('p')).toContainText('User created successfully');
  });

  test('Submitted user should exist in the users list', async ({ page }) => {
    // Navigate to the users list
    await page.goto('http://localhost:5173/users'); // Update if needed
  
    // Wait for the table to be populated
    await page.waitForSelector('tbody tr');
  
    // Log the table contents for debugging
    const tableText = await page.locator('tbody').innerText();
    console.log('Table contents:', tableText);
  
    // Locate the row containing the user data
    const userRow = page.locator('tbody tr').filter({ hasText: 'John' });
  
    // Ensure the row contains the correct data
    await expect(userRow.locator('td:nth-child(2)')).toHaveText('John');
    await expect(userRow.locator('td:nth-child(3)')).toHaveText('Doe');
    await expect(userRow.locator('td:nth-child(4)')).toHaveText('30');
  });

  test('Updating user data succesful', async ({ page }) => {
    // Navigate to the users list
    await page.goto('http://localhost:5173/users'); // Update if needed
  
    // Wait for the table to be populated
    await page.waitForSelector('tbody tr');
  
    // Log the table contents for debugging
    const tableText = await page.locator('tbody').innerText();
  
    // Locate the row containing the user data
    const userRow = page.locator('tbody tr').filter({ hasText: 'John' });
  
    // Extract the user ID from the row (assuming it's in the first column, adjust if necessary)
    const userId = await userRow.locator('td:first-child').innerText();
  
    // Step 3: Update the created user using the extracted user ID
    await page.goto(appAddress);
    await page.fill('input[placeholder="Current User ID"]', userId); // Use the dynamically extracted user ID
    await page.fill('input[placeholder="New First Name"]', 'Dude');
    await page.fill('input[placeholder="New Last Name"]', 'Proot');
    await page.fill('input[placeholder="New Age"]', '69');

    // Click the update button
    await page.click('button:has-text("Update")');

    // Locate the row containing the user data
    const userRowNew = page.locator('tbody tr').filter({ hasText: 'Dude' });
  
    // Ensure the row contains the correct updated data
    await expect(userRowNew.locator('td:nth-child(2)')).toHaveText('Dude');
    await expect(userRowNew.locator('td:nth-child(3)')).toHaveText('Proot');
    await expect(userRowNew.locator('td:nth-child(4)')).toHaveText('69');
  });
  

  test('Deleting the created user should remove it from the users list', async ({ page }) => {
    // Navigate to the application
    await page.goto(appAddress);
    
    // Navigate to the users list page
    await page.goto('http://localhost:5173/users');
    
    // Wait for the table to be populated
    await page.waitForSelector('tbody tr');
    
    // Find the row containing the newly created user
    const userRow = page.locator('tbody tr').filter({ hasText: 'Dude' });
    
    // Locate and click the delete button for the newly created user
    const deleteButton = userRow.locator('button:has-text("Delete")');
    await deleteButton.click();
    
    // Wait for the deletion process to complete (adjust selector if necessary)
    await page.waitForSelector('p', { state: 'visible' });
    
    // Verify that the user has been deleted by checking if the user no longer exists in the table
    const deletedUserRow = page.locator('tbody tr').filter({ hasText: 'Dude' });
    await expect(deletedUserRow).toHaveCount(0);  // Ensure the user no longer exists in the list
  });