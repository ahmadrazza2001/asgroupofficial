import React, { useState, useEffect } from "react";
import Design from "../components/Design";
import "./home.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Home = () => {
  // Carousel texts
  const texts = [
    "AS Group Official",
    "We want you to earn more",
    "Welcome to our world",
  ];

  const paragrapgh = [
    "Bringing the digital world closer to Pakistan",
    "Your investments allows us to generate profit in different ways",
    "Creating business group in various business areas",
  ];

  const [index, setIndex] = useState(0);
  const [para, setPara] = useState(0);

  // Change index every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);
    const pTimer = setInterval(() => {
      setPara((prevPara) => (prevPara + 1) % paragrapgh.length);
    }, 3000);

    // Clean up interval on unmount
    return () => {
      clearInterval(timer);
      clearInterval(pTimer);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="upper-div w-full h-screen text-white flex items-center justify-center relative top-0 left-0">
        <div className="inner-container">
          <Design />
          <div className="text-center px-4 sm:px-0">
            <TransitionGroup>
              <CSSTransition key={index} timeout={500} classNames="fade">
                <div className="container-2">
                  <h1 className="pt-5 text-5xl sm:text-6xl md:text-8xl font-semibold text-white">
                    {texts[index]}
                  </h1>
                  <p className="text-sm sm:text-base md:text-2xl mt-4">
                    {paragrapgh[para]}
                  </p>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
        <footer className="absolute bottom-0 w-full text-center py-4 text-white">
          © {new Date().getFullYear()} AS Group Official
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Home;
