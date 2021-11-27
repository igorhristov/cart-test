import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { currentCurrency } from "../../../redux/currency/currency.actions";

import { currencySymbol } from "../../../helpers";

import * as styles from "./currencies-dropdown.module.css";

class Currencies extends PureComponent {
  render() {
    return (
      <div className={styles.currencies_container}>
        {this.props.currencies.map((currency) => (
          <span
            key={currency}
            className={styles.currency}
            onClick={() => this.props.currentCurrency(currency)}
          >
            {currencySymbol(currency)} <span>{currency}</span>
          </span>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentCurrency: (currency) => dispatch(currentCurrency(currency)),
});

export default connect(null, mapDispatchToProps)(Currencies);
