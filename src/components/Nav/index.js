import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import getAllCategoriesList from "../../queries/get-all-categoriesList";
import { currencySymbol } from "../../helpers";

import { connect } from "react-redux";
import {
  listCurrencies,
  toggleCurrenciesHidden,
} from "../../redux/currency/currency.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CartIcon from "../Cart/Cart-Icon";
import CartDropdown from "../Cart/Cart-Dropdown";

import Logo from "./Logo";

import * as styles from "./nav.module.css";
import Currencies from "../Currency/Currencies-Dropdown";

class Nav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
    };
  }

  async componentDidMount() {
    this.props.listCurrencies();

    const result = await JSON.parse(
      JSON.stringify((await getAllCategoriesList()).categories)
    );

    this.setState({
      categoryList: result,
    });
  }

  render() {
    let hidden = this.props.hidden;
    let hiddenCurrencies = this.props.hiddenCurrencies;

    const currencies = this.props.currencies;

    return (
      <nav className={`${styles.nav} container`}>
        <ul>
          {this.state.categoryList.map((category) => (
            <li key={category.name}>
              <NavLink to={`/category/${category.name}`}>
                {category.name}
              </NavLink>
            </li>
          ))}

          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
        </ul>

        <Logo />

        <ul>
          <li
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
              position: "relative",
            }}
            onClick={() => {
              if (hidden === false) {
                this.props.toggleCartHidden();
                this.props.toggleCurrenciesHidden();
              } else {
                this.props.toggleCurrenciesHidden();
              }
            }}
          >
            <span
              style={{ position: "absolute", right: "8px", fontWeight: "300" }}
            >
              {currencySymbol(this.props.currency)}
            </span>
            <span
              style={{
                fontSize: "2.2rem",
                transform: `rotate(-90deg)`,
              }}
            >
              {hiddenCurrencies ? <>&#8249;</> : <>&#8250;</>}
            </span>
          </li>
          <li>
            <CartIcon />
          </li>
        </ul>
        {hiddenCurrencies ? null : <Currencies currencies={currencies} />}
        {hidden ? null : <CartDropdown />}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  hiddenCurrencies: state.currencies.currenciesHidden,
  currencies: state.currencies.currencies,
  currency: state.currencies.currency,
});

const mapDispatchToProps = (dispatch) => ({
  listCurrencies: () => dispatch(listCurrencies()),
  toggleCurrenciesHidden: () => dispatch(toggleCurrenciesHidden()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
