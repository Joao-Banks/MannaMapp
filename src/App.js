import logo from "./logo.svg";
import "./App.css";
import Hero from "./components/Hero";
import Search from "./components/Search";
import Wards from "./components/Wards";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <h1>MannaMap</h1>
      <Hero />
      <Search />
      <Wards></Wards>
      <Footer></Footer>
    </div>
  );
}

export default App;
