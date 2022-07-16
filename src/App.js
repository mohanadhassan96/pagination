import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "./components/ProductItem";
import ProductSearchControl from "./components/ProductSearchControl";
import Pagination from "./components/Pagination";
import { actSearchProduct, loadUsers } from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalRecords: "",
      totalPages: "",
      pageLimit: "",
      currentPage: "",
      startIndex: "",
      endIndex: "",
      rerender: false,
      products: props.products
    };
  }

  componentDidMount() {
    // this.props.fetchAllProducts();
    //dispatch()
    this.setState({
      totalRecords: this.props.products.length
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     totalRecords: nextProps.products.length
  //   });
  // }

  showProducts = (products, showProducts) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        if (product.value == undefined) {
          product["value"] = false;
        }
        return (
          <ProductItem
            moveItem={this.moveItem}
            key={product.id}
            product={product}
            index={index}
            products={showProducts}
            loadDataAdjustedProducts={this.loadDataAdjustedProducts}
            handleChange={this.handleChange}
          />
        );
      });
    }

    return result;
  };

  loadDataAdjustedProducts = (adjustedProducts) => {
    debugger;
    this.setState({
      products: adjustedProducts
    });
  };

  onSearch = (keyword) => {
    this.props.onSearchProduct(keyword);
  };

  onChangePage = (data) => {
    this.setState({
      pageLimit: data.pageLimit,
      totalPages: data.totalPages,
      currentPage: data.page,
      startIndex: data.startIndex,
      endIndex: data.endIndex
    });
  };
  handleChange = (e) => {
    const id = e.target.id;
    this.setState(() => {
      return {
        products: this.state.products.map((li) =>
          li.id === id ? { ...li, value: !li.value } : li
        )
      };
    });
  };
  handleClick = () => {
    const k = this.state.products;
    debugger;
    this.setState(() => {
      return {
        products: this.state.products.filter((li) => !li.value)
      };
    });
  };
  render() {
    var { keyword } = this.props;
    var { products } = this.state;
    var {
      totalPages,
      currentPage,
      pageLimit,
      startIndex,
      endIndex
    } = this.state;
    var rowsPerPage = [];

    if (keyword) {
      products = products.filter((product) => {
        return product.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    rowsPerPage = (products || []).slice(startIndex, endIndex + 1);

    return (
      <div className="section product_list_mng">
        <div className="container-fluid">
          <div className="box_product_control mb-15">
            <div className="row">
              <ProductSearchControl
                onSearch={this.onSearch}
                keyword={this.props.keyword}
                totalUsers={products.length}
              />
            </div>
          </div>
          <div className="box_tbl_list">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.showProducts(rowsPerPage, products)}</tbody>
            </table>
          </div>
          <div className="box_pagination">
            <div className="row">
              <div className="col-xs-12 box_pagination_info text-right">
                <p>
                  {products.length} of {currentPage}/{totalPages}
                </p>
              </div>
              <button onClick={this.handleClick}>Delete Elements</button>
              <div className="col-xs-12 text-center">
                <Pagination
                  totalRecords={products.length}
                  pageLimit={pageLimit || 5}
                  initialPage={1}
                  pagesToShow={5}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  keyword: PropTypes.string,
  onSearchProduct: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    keyword: state.search
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    //products: () => dispatch(loadUsers()),
    onSearchProduct: (keyword) => {
      dispatch(actSearchProduct(keyword));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
