import CheckoutHeader from "./CheckoutHeader";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { CartProduct } from "./cartProduct";
import { Navigate } from "react-router";
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

  const placeOrder = async () => {
    await axios.post("/api/orders");
    await fetchCart();
    Navigate("/orders");
  };

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

                const deleteItem = async () => {
                  await axios.delete(`/api/cart-items/${item.productId}`);
                  fetchCart();
                };
                return (
                  <>
                    <CartProduct
                      item={item}
                      products={products}
                      deleteItem={deleteItem}
                      selectedDeliveryOption={selectedDeliveryOption}
                      fetchCart={fetchCart}
                      deliveryOption={deliveryOption}
                    />
                  </>
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

              <button
                className="place-order-button button-primary"
                onClick={() => {
                  placeOrder();
                }}
              >
                Place your order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
