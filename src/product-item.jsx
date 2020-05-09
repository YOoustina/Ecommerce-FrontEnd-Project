import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import ProductDetails from './product-details';
class ProductItem extends Component {
  state = {
    id: Number,
    authorized: false,
  };

  componentDidMount() {
    var authorized = false;

    if (`"${this.props.userID}"` == window.localStorage.getItem('loggedPerson')) {
      authorized = true;
    }

    // this.setState({ authorized });
    this.state.authorized = authorized;
    console.log(this.state.authorized);
    console.log(window.localStorage.getItem('loggedPerson'));
    console.log(this.props.userID);
  }
  render() {
    var data = [];
    var imagesUrls = [];
    const { price, discount, userID, id, item, addToCartHandler, deleteHandler } = this.props;
    data = this.props.data;
    imagesUrls = this.props.imagesUrls;

    // console.log(item)
    if (data) {
      return (
        <div className='item-medium-1'>
          {discount && <div className='item-medium-1__alert'>Sale</div>}
          <div className='item-medium-1__image image' style={{ backgroundImage: 'url(' + imagesUrls[0] + ')' }}>
            <Link onClick={() => addToCartHandler(item)} className='item-medium-1__action'>
              Add to Cart
            </Link>
          </div>
          <Link to={`/product-details/${id}`}>
            <h4>{data[0].name}</h4>
            <div className='flex-row'>
              <div>
                {discount && <del>${price}</del>}
                <span className='lable'>${discount ? price - discount : price}</span>
              </div>
            </div>
          </Link>

          {this.state.authorized ? (
            <div className='crud-actions'>
              <Link to='#'>
                <i className='fas fa-edit'></i>
              </Link>
              <Link onClick={() => deleteHandler(item)}>
                <i className='fas fa-trash-alt'></i>
              </Link>
            </div>
          ) : (
            <div className='crud-actions'></div>
          )}
        </div>
      );
    }else{
      return <h3> no products found </h3>;
    }
  }
}
debugger;
export default ProductItem;
