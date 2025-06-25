// components/Home.jsx

import { Link } from "react-router-dom";
import heroImg from "../assets/hero-salon.jpg";
import "./Home.css";
import Products from "./Products";

export default function Home() {
  return (
    <div className="HomePage">
      {/* NAVBAR */}
      <header className="Header">
        <div className="HeaderLeft"></div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="Hero">
        <img src={heroImg} alt="Hero" className="HeroImage" />
        <div className="HeroTitle">
          <div className="HeroWord HeroWordTop">SALT</div>
          <div className="HeroWord HeroWordBottom">SALON</div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="PortfolioSection LightTheme">
        <h2 className="SectionTitle">PORTFOLIO</h2>
        <div className="PortfolioGrid">
          <img src="/images/portfolio1.jpg" alt="Work 1" />
          <img src="/images/portfolio2.jpg" alt="Work 2" />
          <img src="/images/portfolio3.jpg" alt="Work 3" />
          <img src="/images/portfolio4.jpg" alt="Work 4" />
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="AboutSection LightTheme">
        <h2 className="SectionTitle">ABOUT ME</h2>
        <p>
          I’m Lucky, a Master Hairstylist & Creative Director based in San
          Francisco. I specialize in low-maintenance, lived-in color and modern
          cuts. My passion is creating looks that empower clients and elevate
          their personal style.
        </p>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className="ProductsSection LightTheme">
        <h2 className="SectionTitle">PRODUCTS</h2>
        <Products />
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="ContactSection LightTheme">
        <h2 className="SectionTitle">CONTACT</h2>
        <p>Email: luckyxhairsf@gmail.com</p>
        <p>Instagram: @luckyxhair</p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/luckyculley/details/experience/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lucky Culley
          </a>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="Footer LightTheme">
        <div>© 2025 LUCKYXHAIR</div>
      </footer>
    </div>
  );
}
