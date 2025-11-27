import logo from "./logo.svg";
import "./App.css";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Footer from "./components/Footer";
import breadBackground from "./assets/breadbackground.webp";

function App() {
  return (
    <div className="app-wrapper">
      {/* Left and Right fixed side panels */}
      <div className="side-panel left" style={{ backgroundImage: `url(${breadBackground})` }}>
      </div>
      <div className="side-panel right" style={{ backgroundImage: `url(${breadBackground})` }}>
      </div>
      <div className="main-content">
        <h1 className="title">Manna Map</h1>

        <p className="tagline">"Helping you find spiritual nourishment near you."</p>

        <Hero />
        <Search />
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
