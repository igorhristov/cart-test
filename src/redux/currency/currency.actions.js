import CurrencyActionTypes from "./currency.types";

import getCurrencies from "../../queries/get-currencies";

export const listCurrencies = () => async (dispatch) => {
  const currenciesResult = await JSON.parse(
    JSON.stringify((await getCurrencies()).currencies)
  );

  dispatch({
    type: CurrencyActionTypes.CURRENCY_LIST,
    payload: currenciesResult,
  });
};

export const toggleCurrenciesHidden = () => ({
  type: CurrencyActionTypes.TOGGLE_CURRENCIES_HIDDEN,
});

export const currentCurrency = (currency) => ({
  type: CurrencyActionTypes.CURRENT_CURRENCY,
  currency
});
