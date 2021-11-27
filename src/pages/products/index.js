import React, { PureComponent } from "react";
import Product from "../../components/Categories/Product";
import ProductWrapper from "../../components/Categories/Product-Wrapper";
import PageTitle from "../../components/Page-header";

import getAllProducts from "../../queries/get-all-products";

export default class AllProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allProductsList: [],
    };
  }

  async componentDidMount() {
    const result = await JSON.parse(JSON.stringify(await getAllProducts()));

    const unique = Array.from(
      new Set(result.category.products.map(JSON.stringify))
    ).map(JSON.parse);

    this.setState({
      allProductsList: unique,
    });
  }

  render() {
    return (
      <>
      {/* {JSON.stringify(this.state.allProductsList)} */}
        <PageTitle title="ALL PRODUCTS" />

        <ProductWrapper>
          {this.state.allProductsList && (
            <Product items={this.state.allProductsList} />
          )}
        </ProductWrapper>
      </>
    );
  }
}
