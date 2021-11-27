import React, { PureComponent } from "react";
import ShoppingIcon from "../../../images/empty-cart.png";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../../redux/cart/cart.actions";
import { toggleCurrenciesHidden } from "../../../redux/currency/currency.actions";

import * as styles from "./cart-icon.module.css";

class CartIcon extends PureComponent {
  render() {
    return (
      <div
        className={styles.cart__icon}
        onClick={() => {
          if (this.props.currenciesHidden === false) {
            this.props.toggleCurrenciesHidden();
            this.props.toggleCartHidden();
          } else {
            this.props.toggleCartHidden();
          }
        }}
      >
        <img src={ShoppingIcon} alt="shopping-icon" />
        <div
          className={`
            ${styles.cart__item__count} 
            ${this.props.itemCount ? styles.visible : ""} `}
        >
          {this.props.itemCount}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  toggleCurrenciesHidden: () => dispatch(toggleCurrenciesHidden()),
});

const mapStateToProps = ({
  cart: { cartItems },
  currencies: { currenciesHidden },
}) => ({
  itemCount: cartItems.reduce(
    (accQuantity, cartItem) => accQuantity + cartItem.quantity,
    0
  ),
  currenciesHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
