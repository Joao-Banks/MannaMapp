import logo from "./logo.svg";
import "./App.css";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <h1 className="title">Manna Map</h1>
      <Hero />
      <Search />
      <Footer></Footer>
    </div>
  );
}

export default App;
