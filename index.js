const puppeteer = require('puppeteer');

async function searchFlights() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.esky.pl/tanie-loty');
  const buttonSelector = '.css-47sehv';

  await page.evaluate((selector) => {
    const button = document.querySelector(selector);
    if (button) {
      button.click();
    }
  }, buttonSelector);

  const departureAirPort = await page.$('#departureRoundtrip0');
  await departureAirPort.type('Warszawa');

  const arrivalAirPort = await page.$('#arrivalRoundtrip0');
  await arrivalAirPort.type('Helsinki');

  await page.screenshot({ path: 'images/screen5.jpg' });

  await browser.close();
}

searchFlights();
