const puppeteer = require('puppeteer');

//Because it's polish site there is polish name of months
const months = [
  'styczeń',
  'luty',
  'marzec',
  'kwiecień',
  'maj',
  'czerwiec',
  'lipiec',
  'sierpień',
  'wrzesień',
  'październik',
  'listopad',
  'grudzień',
];

async function searchFlights() {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1920, height: 1080 },
  });
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

  const departureDateInput = await page.$('#departureDateRoundtrip0');
  await departureDateInput.click();

  const departureMonth = await page.$('.ui-datepicker-month');
  const monthValue = await page.evaluate(
    (el) => el.textContent,
    departureMonth,
  );

  const currentMonthIndex = months.findIndex(
    (month) => month.toLowerCase() === monthValue.toLowerCase(),
  );

  for (let i = currentMonthIndex; i < 5; i++) {
    const nextMonthBtn = await page.$('.ui-datepicker-next');
    await nextMonthBtn.click();
  }

  const linkHandlers = await page.$x("//a[contains(text(), '28')]");
  await linkHandlers[0].click();

  await page.screenshot({ path: 'images/screen6.jpg' });

  await browser.close();
}

searchFlights();
