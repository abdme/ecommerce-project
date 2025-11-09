import axios from "axios";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/money";

export function DeliveryOptions({ fetchCart, deliveryOption, item }) {
  function deliveryPrice(amountCents) {
    let price = "FREE SHIPPING";
    if (amountCents != 0) {
      price = `$${formatCurrency(amountCents)} Shipping`;
    }
    return price;
  }
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOption.map((option) => {
        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${item.productId}`, {
            deliveryOptionId: option.id,
          });
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
                {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
              </div>
              <div className="delivery-option-price">
                {deliveryPrice(option.priceCents)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
