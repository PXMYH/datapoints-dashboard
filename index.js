const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const screenshotName = 'TMX_BoA_Rate_Probability.png';

  // Navigate to the specified webpage
  await page.goto(
    'https://www.m-x.ca/en/trading/tools/canadian-interest-rate-expectations'
  );

  // Wait for the page to fully load
  await page.waitForTimeout(5000); // Adjust the wait time as needed

  // Take a screenshot of the entire page
  await page.screenshot({
    path: screenshotName,
    fullPage: true,
  });
  console.info('Finished taking snapshot');

  // Close the browser
  await browser.close();
})();
