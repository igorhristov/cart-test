import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import getCategoryProducts from "../../queries/get-category-products";
import ProductList from "../../components/Categories/Product";

import PageTitle from "../../components/Page-header";
import ProductWrapper from "../../components/Categories/Product-Wrapper";

class CategoryPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      categoryId: this.props.match.params.id,
      // categoryId: props.match.location.pathname.replace("/category/", ""),
    };
  }

  async componentDidMount() {
    const result = await JSON.parse(
      JSON.stringify(
        (
          await getCategoryProducts(this.state.categoryId)
        ).category
      )
    );

    this.setState({
      category: result,
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const result = await JSON.parse(
        JSON.stringify(
          (
            await getCategoryProducts(this.props.match.params.id)
          ).category
        )
      );

      this.setState({
        category: result,
      });
    }
  }

  render() {
    const { products } = this.state.category;
    return (
      <>
        <PageTitle title={this.props.match.params.id} />
        {/* <h2>{this.state.categoryId}</h2>
        <h3>{JSON.stringify(this.props.match.params.id)}</h3> */}
        <ProductWrapper>
          {products && <ProductList items={products} />}
        </ProductWrapper>
      </>
    );
  }
}

export default withRouter(CategoryPage);
