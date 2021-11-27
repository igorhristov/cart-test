import React, { PureComponent } from "react";
import { connect } from "react-redux";
import CartItem from "../../components/Cart/cart-item";
import PageTitle from "../../components/Page-header";
import * as styles from "./cart.module.css";

class Cart extends PureComponent {
  render() {
    return (
      <>
        <PageTitle title="Cart" />

        <div className={styles.cart__items}>
          {this.props.cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} mainCart />
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currencies.currency,
});

export default connect(mapStateToProps)(Cart);
