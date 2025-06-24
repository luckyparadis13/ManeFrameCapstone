import "./App.css";
import heroImg from "./assets/hero-salon.jpg";

import portfolio1 from "./assets/portfolio1.jpg";
import portfolio2 from "./assets/portfolio2.jpg";
import portfolio3 from "./assets/portfolio3.jpg";
import portfolio4 from "./assets/portfolio4.jpg";
import ziggyImg from "./assets/ziggy.jpg";

function App() {
  return (
    <>
      {/* NAV BAR */}
      <header className="NavBar">
        <div className="SiteTitle">
          <span className="HairBy">Hair By </span>
          <span className="LuckyModern">Lucky Paradis</span>
        </div>
        <nav className="NavLinks">
          <a href="#">SERVICES</a>
          <a href="#">PRODUCTS</a>
          <a href="#">ABOUT</a>
          <a href="#">CONTACT</a>
          <a href="#">BOOK NOW</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="Hero">
        <div className="HeroImages">
          <img src={heroImg} alt="Hero" />
          {/* <img src={heroImg1} alt="Hero 2" />  <-- Remove this if not needed */}
          <div className="HeroOverlay">
            <p>
              Low maintenance, High impact. Whatever you want, let’s create
              something beautiful!
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="Services">
        <h2>Our Services</h2>
        <div className="ServicesGrid">
          <div className="ServiceItem">
            <img src={portfolio1} alt="Service" />
            <h3>Haircut & Styling</h3>
            <p>Classic or bold looks tailored just for you.</p>
          </div>
          <div className="ServiceItem">
            <img src={portfolio2} alt="Service" />
            <h3>Color Services</h3>
            <p>Expert coloring from lived-in blondes to vivid brights.</p>
          </div>
          <div className="ServiceItem">
            <img src={portfolio3} alt="Service" />
            <h3>Hair Treatments</h3>
            <p>Nourishing treatments for healthy, shiny hair.</p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="Portfolio">
        <h2>Portfolio</h2>
        <div className="PortfolioGrid">
          <img src={portfolio1} alt="Portfolio" />
          <img src={portfolio2} alt="Portfolio" />
          <img src={portfolio3} alt="Portfolio" />
          <img src={portfolio4} alt="Portfolio" />
        </div>
        <button className="ViewWorkBtn">View all work</button>
      </section>

      {/* ZIGGY BLOCK */}
      <section className="ZiggyBlock">
        <img src={ziggyImg} alt="Ziggy" />
        <h2>Don't be shy, come say hi!!</h2>
        <h3>EVERYONE IS WELCOME</h3>
        <button>Book Now</button>
      </section>

      {/* FOOTER */}
      <footer className="Footer">
        <button className="FooterBookBtn">Book Now</button>
        <p>&copy; 2025 LUCKYXHAIR — Created by Lucky Paradis.</p>
      </footer>
    </>
  );
}

export default App;
