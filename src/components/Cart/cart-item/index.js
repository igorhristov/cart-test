import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { currencySymbol, currencyToAmount } from "../../../helpers";

import {
  removeItemFromCart,
  addQuantityToCartItem,
  removeQuantityFromCartItem,
} from "../../../redux/cart/cart.actions";
import Attributes from "../../Attributes";

import * as styles from "./cart-item.module.css";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleRightImages = this.handleRightImages.bind(this);
    this.handleLeftImages = this.handleLeftImages.bind(this);

    this.state = {
      mainImage: 0,
    };
  }

  handleRightImages(ix) {
    this.setState({
      mainImage: this.state.mainImage === ix - 1 ? 0 : this.state.mainImage + 1,
    });
  }

  handleLeftImages(ix) {
    this.setState({
      mainImage: this.state.mainImage === 0 ? ix - 1 : this.state.mainImage - 1,
    });
  }

  render() {
    const { id, name, prices, gallery, attributes, quantity } = this.props.item;
    const currentProductSelectedAttributes = this.props.selectedAttributes.find(
      (item) => item.id === id
    );

    const selected =
      currentProductSelectedAttributes &&
      currentProductSelectedAttributes.attributes;

    attributes &&
      selected &&
      attributes.map((attribute, ix) => {
        return attribute.items.map((item) => {
          if (item.id === selected[ix].items.id) {
            item.selected = true;
            return item;
          }

          item.selected = false;
          return item;
        });
      });

    return (
      <div className={styles.cart__item}>
        <button
          className={styles.cart__remove__btn}
          onClick={() => this.props.removeItemFromCart(id)}
        >
          &#10005;
        </button>
        <div className={styles.details}>
          <span className={styles.name}>{name}</span>
          <span className={styles.price}>
            {currencySymbol(this.props.currency)}{" "}
            {(
              prices[currencyToAmount(this.props.currency)].amount * quantity
            ).toFixed(2)}
          </span>

          <Attributes
            attributes={attributes}
            cartAttributes
            selectAttributes={currentProductSelectedAttributes}
            attributeDropdown={this.props.attributeDropdown}
            currentProductId={id}
          />
        </div>
        <div className={styles.quantity}>
          <span
            className={styles.quantity__add}
            onClick={() => this.props.addQuantityToCartItem(this.props.item)}
          >
            +
          </span>
          <span>{quantity}</span>
          <span
            className={styles.quantity__remove}
            onClick={() =>
              this.props.removeQuantityFromCartItem(this.props.item)
            }
          >
            -
          </span>
        </div>
        <div className={styles.img__wrapper}>
          <span
            className={styles.img__arrows}
            onClick={() => this.handleLeftImages(gallery.length)}
          >
            &#60;
          </span>
          <img src={gallery[Number(this.state.mainImage)]} alt={name} />
          <span
            className={styles.img__arrows}
            onClick={() => this.handleRightImages(gallery.length)}
          >
            &#62;
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currencies.currency,
  selectedAttributes: state.cart.selectedAttributes,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  addQuantityToCartItem: (item) => dispatch(addQuantityToCartItem(item)),
  removeQuantityFromCartItem: (item) =>
    dispatch(removeQuantityFromCartItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
