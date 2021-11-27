import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { currencySymbol, currencyToAmount } from "../../helpers";
import { addItemToCart } from "../../redux/cart/cart.actions";
import Attributes from "../Attributes";

import * as styles from "./product-details.module.css";

class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.handleImages = this.handleImages.bind(this);
    this.state = {
      mainImage: 0,
    };
  }

  handleImages(ix) {
    this.setState({ mainImage: ix });
  }

  render() {
    const {
      id,
      name,
      description,
      brand,
      attributes,
      prices,
      inStock,
      gallery,
    } = this.props.details;

   

    const currentProductSelectedAttributes = this.props.selectedAttributes.find(
      (item) => item.id === id
    );

    const selected =
      currentProductSelectedAttributes &&
      currentProductSelectedAttributes.attributes;

   const selections = attributes &&
      selected &&
      attributes.map((attribute, ix) => {
        return attribute.items.map((item) => {
          if (item.id === selected[ix].items.id) {
            item.selected = true;
            return item;
          }

          item.selected = false
          return item;
        });
      });

      const cartItem = (({ id, name, prices, attributes, gallery }) => ({
        id,
        name,
        prices,
        attributes ,
        gallery,
      }))(this.props.details);

    return (
      <div className={styles.product__details}>
        <div className={styles.side__images}>
          {gallery &&
            gallery.map((item, ix) => (
              <img
                style={{ cursor: "pointer" }}
                src={item}
                width="100px"
                alt={name + " - " + (ix + 1)}
                onClick={() => this.handleImages(ix)}
              />
            ))}
        </div>

        <div className={styles.main__image}>
          <img
            src={gallery && gallery[Number(this.state.mainImage)]}
            width="200px"
            alt={name}
          />
        </div>

        <div className={styles.product__details__content}>
          <h1 className={styles.product__title}>{name}</h1>

          <h4 className={styles.product__brand}>{brand}</h4>

          <Attributes
            attributes={this.props.details.attributes}
            selectAttributes={currentProductSelectedAttributes}
            currentProductId={id}
          />

          <div className={styles.product__price}>
            Price: <br />
            <div
              style={{
                fontSize: "1.6rem",
                display: "flex",
              }}
            >
              {currencySymbol(this.props.currency)}
              <span style={{ marginTop: "-.25rem" }}>
                {prices && prices[currencyToAmount(this.props.currency)].amount}
              </span>
            </div>
          </div>
          <button
            disabled={!inStock}
            className={`${styles.product__btn} ${!inStock ? "" : "disabled"}`}
            onClick={() => this.props.addItemToCart(cartItem)}
          >
            ADD TO CART
          </button>

          <div
            className={styles.product__description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
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
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
