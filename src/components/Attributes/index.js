import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { selectAttribute } from "../../redux/cart/cart.actions";

import * as styles from "./attributes.module.css";

class Attributes extends PureComponent {
  render() {
    return (
      <div className={styles.attributes}>
        {this.props.attributes &&
        this.props.attributes &&
        this.props.attributes.length < 1
          ? ""
          : this.props.attributes &&
            this.props.attributes.map((attribute) => (
              <>
                <div
                  className={`${styles.attributes} ${
                    this.props.attributeDropdown &&
                    attribute.id !== "Size" &&
                    attribute.id !== "Color"
                      ? styles.attribute__item__dropdown
                      : styles.attributes
                  }`}
                  key={attribute.id}
                >
                  {this.props.cartAttributes ? null : <p>{attribute.id}</p>}

                  {attribute.items.map((item) => (
                    <span
                      key={item.id}
                      style={{
                        backgroundColor: `${item.id}`,
                        // background: `${item.selected}`,
                        opacity: `${item.selected ? "1" : "0.2"}`,
                      }}
                      className={`${styles.attribute__item} ${
                        this.props.attributeDropdown
                          ? styles.selected__mini__cart
                          : styles.selected__cart
                      }`}
                      onClick={() =>
                        this.props.selectAttribute({
                          currentProductId: this.props.currentProductId,
                          attributeId: attribute.id,
                          itemId: item.id,
                          itemVal: item.value,
                          selectedVal: item.selected
                        })
                      }
                    >
                      {attribute.id === "Color" ? "" : item.value}
                    </span>
                  ))}
                </div>
              </>
            ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectAttribute: (item) => dispatch(selectAttribute(item)),
});

export default connect(null, mapDispatchToProps)(Attributes);
