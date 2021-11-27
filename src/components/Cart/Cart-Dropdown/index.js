import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../../redux/cart/cart.actions";

import { currencySymbol, totalAmount } from "../../../helpers";

import CartItem from "../cart-item";

import * as styles from "./cart-dropdown.module.css";

class CartDropdown extends PureComponent {
  render() {
    return (
      <div
        className={`${styles.cart__dropdown} ${
          this.props.cartItems.length === 0 ? styles.empty : ""
        }`}
      >
        {this.props.cartItems.length === 0 ? (
          <p>Your Cart is Empty</p>
        ) : (
          <>
            <h2>
              My Bag, <span> {this.props.cartItems.length} items</span>
            </h2>
            <div className={styles.cart__items}>
              {this.props.cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} item={cartItem} attributeDropdown />
              ))}
            </div>

            <div className={styles.total}>
              <span>Total</span>
              <span>
                {" "}
                {currencySymbol(this.props.currency)}
                {totalAmount(this.props.cartItems, this.props.currency).toFixed(
                  2
                )}
              </span>
            </div>
            <div className={styles.cart__btns}>
              <Link to="/cart" onClick={this.props.toggleCartHidden}>
                View Bag
              </Link>
              <Link to="/cart">CHECK OUT</Link>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currencies.currency,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
