import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  addItemToCart,
  selectedAttributesList,
} from "../../../redux/cart/cart.actions";

import WhiteShoppingIcon from "../../../images/white-empty-cart.png";

import { currencySymbol, currencyToAmount } from "../../../helpers";

import * as styles from "./product.module.css";

class ProductsListItem extends PureComponent {
  render() {
    return (
      <>
        {this.props.items.map((product) => (
          <div style={{ position: "relative", marginBottom: "5rem" }}>
            {/* {JSON.stringify(product.inStock)} */}
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={styles.product}
            >
              <div style={{ position: "relative" }}>
                <img
                  className={styles.product__img}
                  src={product.gallery[0]}
                  alt={product.name}
                />
                {product.inStock ? null : (
                  <div className={styles.product__overlay}>Out of Stock</div>
                )}
              </div>
              <div
                className={`${styles.product__content} ${
                  product.inStock ? "" : styles.product__no__stock
                }`}
                style={{ marginTop: "auto" }}
              >
                <h3>{product.name}</h3>
                <p>
                  {currencySymbol(this.props.currency)}{" "}
                  {product.prices[currencyToAmount(this.props.currency)].amount}
                </p>
              </div>
            </Link>
            {product.inStock ? (
              <button
                className={styles.product_add_to_cart}
                onClick={() => {
                  this.props.addItemToCart(product);
                  this.props.selectedAttributesList(
                    (({ id, attributes }) => ({ id, attributes }))(product)
                  );
                }}
              >
                <img src={WhiteShoppingIcon} alt="shopping icon" />
              </button>
            ) : null}
          </div>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.currency,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
  selectedAttributesList: (data) => dispatch(selectedAttributesList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItem);
