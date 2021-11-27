import React, { PureComponent } from "react";
import { connect } from "react-redux";

import ProductDetails from "../../components/Product-Details";
import getProduct from "../../queries/get-product";

import { selectedAttributesList } from "./../../redux/cart/cart.actions";

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      productId: props.match.location.pathname.replace("/product/", ""),
    };
  }

  async componentDidMount() {
    const result = await JSON.parse(
      JSON.stringify((await getProduct(this.state.productId)).product)
    );

    this.setState({
      product: result,
    });

    this.props.selectedAttributesList(
      (({ id, attributes }) => ({ id, attributes }))(this.state.product)
    );
  }

  render() {
    return (
      <div>
        <ProductDetails details={this.state.product} />;
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectedAttributesList: (data) => dispatch(selectedAttributesList(data)),
});

export default connect(null, mapDispatchToProps)(ProductPage);
