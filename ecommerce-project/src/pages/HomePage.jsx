import "./HomePage.css";
import Header from "../components/header";
import { Product } from "./Product";
import { useSearchParams } from "react-router";
// import { products } from "../../starting-code/data/products";

export default function HomePage({ cart, products, fetchCart }) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  return (
    <>
      <Header cart={cart} />
      <title>E-commerce Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                products={products}
                fetchCart={fetchCart}
                product={product}
                search={search}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
