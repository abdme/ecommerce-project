import { useState } from "react";
import dayjs from "dayjs";
import { formatCurrency } from "../../utils/money";
export function CartProduct({
  products,
  item,
  selectedDeliveryOption,
  deleteItem,
}) {
  const [updateBtn, setUpdateBtn] = useState(false);
  const [quantity, setQuantity] = useState(0);
  let currentProduct = [];
  const updateBtnAction = () => {
    setUpdateBtn(true);
  };
  return (
    <div key={item.productId} className="cart-item-container">
      {products.forEach((product) => {
        if (item.productId === product.id) {
          currentProduct = product;
        }
      })}
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>
      <div className="cart-item-details-grid">
        <img className="product-image" src={currentProduct.image} />

        <div className="cart-item-details">
          <div className="product-name">{currentProduct.name}</div>
          <div className="product-price">
            ${formatCurrency(currentProduct.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity: <span className="quantity-label">{item.quantity}</span>
            </span>

            <span
              className="update-quantity-link link-primary"
              onClick={() => {
                updateBtnAction();
                setQuantity(item.quantity);
              }}
            >
              Update
            </span>
            <input
              className={`update-input-${item.productId}`}
              type="text"
              size="2"
              value={quantity}
              style={{ display: updateBtn ? "inline" : "none" }}
              onKeyDown={() => {}}
              onChange={(e) => {
                if (e.key === "Enter") {
                  setQuantity(parseInt(e.target.value));
                }
              }}
            />
            <span
              className="delete-quantity-link link-primary"
              onClick={() => {
                deleteItem();
              }}
              style={{ display: updateBtn ? "none" : "inline" }}
            >
              Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
