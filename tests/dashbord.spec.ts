import {test, expect} from '@playwright/test';

test.describe('dashboard automation', () => {
test.describe.configure({ mode: 'parallel' });
    test.beforeEach(async ({ page }) => {
        await page.goto('/dashboard');
    });

    test('program' ,{ tag: '@smoke'}, async ({ page }) => {
        const programs = page.getByRole('link', { name: 'Programs', exact: true });
        await expect(programs).toBeVisible();
        await programs.click();
        const heading = page.getByRole('heading', { name: 'Mastery Programs1.' });
        await expect(heading).toBeVisible();
    });

    test('Courses', async ({ page }) => {
        const courses = page.getByRole('link', { name: 'Courses', exact: true });
        await expect(courses).toBeVisible();
        await courses.click();

        const heading = page.getByRole('heading', { name: 'Single Courses.' });
        await expect(heading).toBeVisible();
    });

    test('For Teams', async ({ page }) => {
        const forTeams = page.getByRole('navigation').getByRole('link', { name: 'For Teams', exact: true });
        await expect(forTeams).toBeVisible();
        await forTeams.click();

        const heading = page.getByRole('heading', { name: 'Playwright and Cypress training for your QA team' });
        await expect(heading).toBeVisible();
    });

    test('Blog', async ({ page }) => {
        const blog = page.getByRole('navigation').getByRole('link', { name: 'Blog', exact: true });
        await expect(blog).toBeVisible();
        await blog.click();

        const heading = page.getByRole('heading', { name: 'Latest Articles.' });
        await expect(heading).toBeVisible();
    });

      test('My Learning', async ({ page }) => {
        const myLearning = page.getByRole('navigation').getByRole('link', { name: 'My Learning', exact: true });
        await expect(myLearning).toBeVisible();
        await myLearning.click();

        const heading = page.getByRole('heading', { name: 'No courses yet' });
        await expect(heading).toBeVisible();
    });

});