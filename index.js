const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const screenshotName = 'TMX_BoA_Rate_Probability.png';
  const interestRateFileName = 'BoC_Interest_Rate.txt';

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

  // Fetch Bank of Canada interest rate
  await page.goto(
    'https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/'
  );
  await page.waitForSelector(
    '#target-table > tbody > tr:nth-child(1) > td:nth-child(2)'
  );
  const interestRate = await page.$eval(
    '#target-table > tbody > tr:nth-child(1) > td:nth-child(2)',
    (element) => element.textContent.trim()
  );

  // Save the interest rate to a text file
  await fs.writeFile(interestRateFileName, interestRate, 'utf-8');
  console.info(
    `Bank of Canada Interest Rate: ${interestRate}%, saved to ${interestRateFileName}`
  );

  // Close the browser
  await browser.close();
})();
