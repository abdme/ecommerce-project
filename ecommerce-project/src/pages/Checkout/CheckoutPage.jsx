import CheckoutHeader from "./CheckoutHeader";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { formatCurrency } from "../../../src/utils/money";
export default function CheckoutPage({ cart, products, fetchCart }) {
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchDeliveryOptions = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOption(response.data);
    };
    fetchDeliveryOptions();
    const fetchPaymentSummary = async () => {
      let response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    fetchPaymentSummary();
  }, [cart]);
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
                function deleteItem() {
                  axios.delete(`/api/cart-items/${item.productId}`);
                  fetchCart();
                }
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
                          <span
                            className="delete-quantity-link link-primary"
                            onClick={() => {
                              deleteItem();
                            }}
                          >
                            Delete
                          </span>
                        </div>
                      </div>

                      <div className="delivery-options">
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOption.map((option) => {
                          const updateDeliveryOption = async () => {
                            await axios.put(
                              `/api/cart-items/${item.productId}`,
                              {
                                deliveryOptionId: option.id,
                              }
                            );
                            fetchCart();
                          };
                          return (
                            <div
                              key={option.id}
                              className="delivery-option"
                              onClick={updateDeliveryOption}
                            >
                              <input
                                type="radio"
                                checked={option.id === item.deliveryOptionId}
                                className="delivery-option-input"
                                name={`delivery-option-${item.productId}`}
                                onChange={() => {}}
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
          {paymentSummary && (
            <div className="payment-summary">
              <div className="payment-summary-title">Payment Summary</div>
              <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">
                  ${formatCurrency(paymentSummary.productCostCents)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">
                  ${formatCurrency(paymentSummary.shippingCostCents)}
                </div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">
                  ${formatCurrency(paymentSummary.totalCostBeforeTaxCents)}
                </div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">
                  ${formatCurrency(paymentSummary.taxCents)}
                </div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">
                  ${formatCurrency(paymentSummary.totalCostCents)}
                </div>
              </div>

              <button className="place-order-button button-primary">
                Place your order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
