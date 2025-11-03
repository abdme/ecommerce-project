import Header from "../components/Header";
import "./OrdersPage.css";
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
import { formatCurrency } from "../utils/money";
import logoWhite from "../assets/images/logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
import buyAgain from "../assets/images/icons/buy-again.png";
export default function Orders({ cart, products }) {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      let response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrders();
  });
  return (
    <>
      <Header cart={cart} />
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <title>Orders</title>
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src={logoWhite} />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src={searchIcon} />
          </button>
        </div>

        <div className="right-section">
          <a className="orders-link header-link" href="/orders">
            <span className="orders-text">Orders</span>
          </a>

          <a className="cart-link header-link" href="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders &&
            orders.map((order) => {
              return (
                <div key={order.id} className="order-container">
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>${formatCurrency(order.totalCostCents)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>
                  <div className="order-details-grid">
                    {order.products.map((orderProduct) => {
                      return (
                        <Fragment key={orderProduct.productId}>
                          <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {orderProduct.product.name}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on:{" "}
                              {dayjs(
                                orderProduct.estimatedDeliveryTimeMs
                              ).format("MMMM D")}
                            </div>
                            <div className="product-quantity">
                              Quantity: {orderProduct.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img className="buy-again-icon" src={buyAgain} />
                              <span className="buy-again-message">
                                Add to Cart
                              </span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a href="/tracking">
                              <button className="track-package-button button-secondary">
                                Track package
                              </button>
                            </a>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
