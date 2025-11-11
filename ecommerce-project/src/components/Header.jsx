import { NavLink, useNavigate } from "react-router";
import "./Header.css";
import { useState } from "react";
import searchLogo from "../assets/images/icons/search-icon.png";
import mobileLogoWhite from "../assets/images/mobile-logo-white.png";
import logoWhite from "../assets/images/logo-white.png";
import cartIcon from "../assets/images/icons/cart-icon.png";
export default function Header({ cart }) {
  const [searchBar, setSearchBar] = useState("");
  const navigate = useNavigate();
  let totalCartQuantity = 0;
  cart.forEach((cartItem) => {
    totalCartQuantity += cartItem.quantity;
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={logoWhite} />
            <img className="mobile-logo" src={mobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchBar}
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
          />

          <button
            className="search-button"
            onClick={() => {
              if (searchBar != "") {
                navigate(`?search=${searchBar}`);
              }
            }}
          >
            <img className="search-icon" src={searchLogo} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity">{totalCartQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
