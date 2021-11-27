export const currencySymbol = (cur) => {
  switch (cur) {
    case "USD":
      return <span>$</span>;
    case "GBP":
      return <span>&pound;</span>;
    case "AUD":
      return <span>A$</span>;
    case "JPY":
      return <span>&#165;</span>;
    case "RUB":
      return <span>&#8381;</span>;
    default:
      return <span>$</span>;
  }
};

export const currencyToAmount = (currency) => {
  switch (currency) {
    case "USD":
      return 0;
    case "GBP":
      return 1;
    case "AUD":
      return 2;
    case "JPY":
      return 3;
    case "RUB":
      return 4;
    default:
      return 0;
  }
};

export const totalAmount = (cartItems, currentCurrency) => {
  return cartItems.reduce((acc, item) => {
    return (
      acc +
      item.quantity * item.prices[currencyToAmount(currentCurrency)].amount
    );
  }, 0);
};
