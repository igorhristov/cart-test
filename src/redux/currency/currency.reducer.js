import CurrencyActionTypes from "./currency.types";

const INITIAL_STATE = {
  currenciesHidden: true,
  currencies: [],
  currency: "USD",
};

const currencyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrencyActionTypes.CURRENCY_LIST:
      return {
        ...state,
        currencies: action.payload,
      };

    case CurrencyActionTypes.TOGGLE_CURRENCIES_HIDDEN:
      return {
        ...state,
        currenciesHidden: !state.currenciesHidden,
      };

    case CurrencyActionTypes.CURRENT_CURRENCY:
      return {
        ...state,
        currency: action.currency
      };

    default:
      return state;
  }
};

export default currencyReducer;
