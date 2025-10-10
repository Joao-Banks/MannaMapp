import "./styles/Hero.css";
function Hero() {
  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div className="verses">
          <p className="verse">
            31 Our fathers did eat manna in the desert; as it is written, He
            gave them bread from heaven to eat.
          </p>
          <p className="verse">
            35 And Jesus said unto them, I am the bread of life: he that cometh
            to me shall never hunger; and he that believeth on me shall never
            thirst.
          </p>
        </div>
        <p className="reference">— John 6:31,35</p>
      </div>
    </div>
  );
}
export default Hero;
