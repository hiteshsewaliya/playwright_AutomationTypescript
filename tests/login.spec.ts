import { test, expect } from '@playwright/test';

test('shows the learning page when logged in', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('No courses yet')).toBeVisible();
});