import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Services from "./components/Services";
import Home from "./components/Home";
import BookNow from "./components/BookNow";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll",
        window.scrollY + "px"
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div className="SiteWrapper">
        <header className="Header">
          <div className="HeaderLeft">
            <div className="Name">LUCKY PARADIS</div>
          </div>
          <nav className="HeaderNav">
            <Link to="/">HOME</Link>
            <Link to="/products">PORTFOLIO</Link>
            <Link to="/products">PRODUCTS</Link>
            <Link to="/services">SERVICES</Link>
            <Link to="/book">BOOK NOW</Link>
            <Link to="/cart">CART ({cart.length})</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookNow />} />
          <Route
            path="/products"
            element={<Products cart={cart} setCart={setCart} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
          <Route path="/services" element={<Services />} />
        </Routes>

        <footer className="Footer">
          <div>© 2025 LUCKYXHAIR</div>
          <div className="FooterLinks">
            <a href="#">Instagram</a>
            <a href="#">Email</a>
            <a href="https://www.linkedin.com/in/luckyculley/details/experience/">
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
