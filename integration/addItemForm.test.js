import { beforeEach } from 'jest';

beforeEach(() => {
  page.goto('http://localhost:6006/iframe.html?id=appreduxbase--docs',
    { waitUntil: "networkidle2" });
})

describe('addItemForm', () => {
  it('base example, visually looks correct', async () => {
    // APIs from jest-puppeteer

    const image = await page.screenshot();

    // API from jest-image-snapshot
    expect(image).toMatchImageSnapshot();
  });
});
