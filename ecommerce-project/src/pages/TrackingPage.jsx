import Header from "../components/header";
import { Link } from "react-router";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./TrackingPage.css";
import logoWhite from "../assets/images/logo-white.png";
import mobileLogoWhite from "../assets/images/mobile-logo-white.png";
import { useParams } from "react-router";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
export default function Tracking({ cart, products }) {
  const [currentOrder, setCurrentOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      let response = await axios.get(`/api/orders/${orderId}?expand/products`);
      setCurrentOrder(response.data);
    };
    fetchOrders();
  }, [orderId]);
  let cartQuantity = 0;
  {
    cart &&
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
  }

  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src={logoWhite} />
            <img className="mobile-logo" src={mobileLogoWhite} />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src={searchIcon} />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity">{cartQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          {currentOrder &&
            currentOrder.products.map((item) => {
              // const timeCalculations = deliveryTimeCalculations(
              //   item.estimatedDeliveryTimeMs,
              //   currentOrder.orderTimeMs
              // );
              if (products.length === 0) {
                return <p>Loading the Products....</p>;
              }
              const foundItem = products.find(
                (product) => product.id === item.productId
              );

              return (
                foundItem && (
                  <Fragment key={item.productId}>
                    <div className="delivery-date">
                      Arriving on
                      {dayjs(item.estimatedDeliveryTimeMs).format("MMMM, D")}
                    </div>

                    <div className="product-info">{foundItem.name}</div>

                    <div className="product-info">
                      Quantity: {item.quantity}
                    </div>

                    <img className="product-image" src={foundItem.image} />
                  </Fragment>
                )
              );
            })}

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div style={{ width: `$` }} className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
