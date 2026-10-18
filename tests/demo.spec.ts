import {test, expect} from '@playwright/test';

test.describe('Demo Test', () => {

test.describe.configure({ mode: 'serial' });

test.beforeEach('hello', async ({  }) => {
    console.log('Hello World');
});

test('where is my candy', async ({ page }) => {
    console.log('Where is my candy?');
});

test('i am alive', async ({ page }) => {
    console.log('I am alive!');
});

test.afterEach('goodbye', async ({  }) => {
    console.log('Goodbye World');
});

});
