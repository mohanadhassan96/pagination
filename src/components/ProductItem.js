import React, { Component } from "react";

class ProductItem extends Component {
  // Move list item Up
  listItemUp = function (itemIndex) {
    debugger;
    if (itemIndex === 0) {
      alert("no records on top to push");
      return;
    }

    this.moveItem(itemIndex, itemIndex - 1);
  };

  // Move list item Down
  listItemDown = function (itemIndex) {
    debugger;
    if (itemIndex === 4) {
      alert("no records in the bottom to push");
      return;
    }
    this.moveItem(itemIndex, itemIndex + 1);
  };
  // Move list items up or down or swap
  moveItem = function (origin, destination) {
    debugger;
    var temp = this.props.products[destination];
    this.props.products[destination] = this.props.products[origin];
    this.props.products[origin] = temp;
    this.props.loadDataAdjustedProducts(this.props.products);
  };

  render() {
    var { product, index } = this.props;

    return (
      <tr>
        <td className="col_order text-center">
          <input
            type="checkbox"
            id={product.id}
            checked={product.value}
            onChange={this.props.handleChange}
          />
        </td>

        <td className="col_name">{product.name}</td>
        <td className="col_name">{product.email}</td>
        <td className="col_name">{product.role}</td>
        <td className="col_name">
          <i
            onClick={() => this.listItemUp(product.id - 1)}
            class="fa fa-long-arrow-up"
            aria-hidden="true"
          ></i>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <i
            onClick={() => this.listItemDown(product.id - 1)}
            class="fa fa-long-arrow-down"
            aria-hidden="true"
          ></i>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
