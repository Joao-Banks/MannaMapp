import logo from "./logo.svg";
import "./App.css";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="main-content">
      <h1 className="title">Manna Map</h1>

      <p className="tagline">"Helping find spiritual nourishment near you."</p>

      <Hero />
      <Search />
      <Footer />
    </div>
  );
}

export default App;
