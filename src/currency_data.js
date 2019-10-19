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
    name: "Chinese Renminbi",
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
  },
  NOK: {
    name: "Norwegian Krone",
    country: "Norway"
  },
  TRY: {
    name: "Turkish Lira",
    country: "Turkey"
  },
  BGN: {
    name: "Bulgarian Lev",
    country: "Bulgaria"
  },
  MYR: {
    name: "Malaysian Ringgit",
    country: "Malaysia"
  },
  CHF: {
    name: "Swiss Franc",
    country: "Switzerland"
  },
  THB: {
    name: "Thai Baht",
    country: "Thailand"
  },
  SGD: {
    name: "Singapore Dollar",
    country: "Singapore"
  },
  PLN: {
    name: "Polish Zloty",
    country: "Poland"
  },
  NZD: {
    name: "New Zealand Dollar",
    country: "New Zealand"
  },
  ZAR: {
    name: "South African Rand",
    country: "South Africa"
  },
  MXN: {
    name: "Mexican Peso",
    country: "Mexico"
  },
  ILS: {
    name: "	Israeli Shekel",
    country: "Israel"
  },
  KRW: {
    name: "South Korean Won",
    country: "South Korea"
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
