import CheckoutHeader from "./CheckoutHeader";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { formatCurrency } from "../../../src/utils/money";
export default function CheckoutPage({ cart, products }) {
  const [deliveryOption, setDeliveryOption] = useState("");
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOption(response.data);
      });
  }, []);
  function deliveryPrice(amountCents) {
    let price = "FREE SHIPPING";
    if (amountCents != 0) {
      price = `$${formatCurrency(amountCents)} Shipping`;
    }
    return price;
  }
  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader cart={cart} />
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOption.length > 0 &&
              cart.map((item) => {
                const selectedDeliveryOption = deliveryOption.find((option) => {
                  return option.id === item.deliveryOptionId;
                });
                let currentProduct = [];
                return (
                  <div key={item.productId} className="cart-item-container">
                    {products.forEach((product) => {
                      if (item.productId === product.id) {
                        currentProduct = product;
                      }
                    })}
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs
                      ).format("dddd, MMMM D")}
                    </div>
                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={currentProduct.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {currentProduct.name}
                        </div>
                        <div className="product-price">
                          ${formatCurrency(currentProduct.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span className="quantity-label">
                              {item.quantity}
                            </span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOption.map((option) => {
                          return (
                            <div key={option.id} className="delivery-option">
                              <input
                                type="radio"
                                checked={option.id === item.deliveryOptionId}
                                className="delivery-option-input"
                                name={`delivery-option-${currentProduct.id}`}
                              />
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(option.estimatedDeliveryTimeMs).format(
                                    "dddd, MMMM D"
                                  )}
                                </div>
                                <div className="delivery-option-price">
                                  {deliveryPrice(option.priceCents)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
