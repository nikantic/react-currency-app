const currencyData = {
  CAD: {
    name: "Canadian Dollar",
    country: "Canada"
  },
  EUR: {
    name: "Euro",
    country: "European Union"
  },
  HKD: {
    name: "Hong Kong Dollar",
    country: "Hong Kong"
  },
  JPY: {
    name: "Japanese Yen",
    country: "Japan"
  },
  USD: {
    name: "United States Dollar",
    country: "United States of America"
  },
  GBP: {
    name: "Pound Sterling",
    country: "United Kingdom"
  },
  BRL: {
    name: "Brazilian Real",
    country: "Brazil"
  },
  CZK: {
    name: "Czech Koruna",
    country: "Czech Republic"
  },
  CNY: {
    name: "Chinese Yuan Renminbi",
    country: "China"
  },
  RUB: {
    name: "Russian Ruble",
    country: "Russia"
  },
  ISK: {
    name: "Icelandic Krona",
    country: "Iceland"
  },
  HUF: {
    name: "Hungarian Forint",
    country: "Hungary"
  },
  PHP: {
    name: "	Philippine Peso",
    country: "Philippines"
  },
  DKK: {
    name: "Danish Krone",
    country: "Denmark"
  },
  HRK: {
    name: "Croatian Kuna",
    country: "Croatia"
  },
  SEK: {
    name: "Swedish Krona",
    country: "Sweden"
  },
  IDR: {
    name: "	Indonesian Rupiah",
    country: "Indonesia"
  },
  INR: {
    name: "	Indian Rupee",
    country: "India"
  },
  AUD: {
    name: "	Australian Dollar",
    country: "Australia"
  },
  RON: {
    name: "	Romanian Leu",
    country: "Romania"
  }
};

const findCurrencyData = currency => {
  for (let key in currencyData) {
    if (key === currency) {
      return currencyData[key];
    }
  }
};

export default findCurrencyData;
