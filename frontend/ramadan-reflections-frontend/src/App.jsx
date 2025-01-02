import React, { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import dates from "./data/dates.json";

function App() {
  const { ramadanStartDate } = dates;

  const [activeSection, setActiveSection] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [fadeColor, setFadeColor] = useState('');

  const sections = [
    <div className="section">
      <h1>Countdown to Ramadan</h1>
      <CountdownTimer targetDate={ramadanStartDate} />
      <p>Are you ready for Ramadan? <br />
        Use this tool to see how far you've come since last Ramadan, and set goals for the upcoming Ramadan. <br /> 
        You can also see how people around you are doing! <br />
        Click the green to start.</p>
    </div>,
    <div className="section">
      <h2>Reflections</h2>
      <p>The next few pages will ask you to score yourself on a scale of 1-10 on your activities since last Ramadan</p>
    </div>,
    <div className="section">
      <h2>Commitments</h2>
      <p>The next few pages will ask you to select your commitments for the upcoming Ramadan and the months after</p>
    </div>,
    <div className="section">
      <h2>Personal Insights</h2>
      <p>See how you've progressed since last Ramadan!</p>
    </div>,
    <div className="section">
      <h2>Community Insights</h2>
      <p>See how you compare to your community!</p>
    </div>,
    <div className="section">
      <h2>Share</h2>
      <p>Share your commitments with your friends and family!</p>
    </div>,
  ];

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setIsFading(true);
      setTimeout(() => {
        setActiveSection((prev) => prev + 1);
        setIsFading(false);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (activeSection > 0) {
      setIsFading(true);
      setTimeout(() => {
        setActiveSection((prev) => prev - 1);
        setIsFading(false);
      }, 500);
    }
  };

  const triggerRadiateEffect = (button, color) => {
    button.classList.add('radiate');
    button.addEventListener('animationend', () => {
      button.classList.remove('radiate');
    }, { once: true });
    setFadeColor(color);
  };

  return (
    <div className={`app ${isFading ? "fading" : ""}`} style={{ backgroundColor: isFading ? fadeColor : '' }}>
      <div className="content">{sections[activeSection]}</div>
      <div className="navigation-buttons">
        {/* Hide the left button if on the first section */}
        {activeSection > 0 && (
          <button
            className="nav-button left"
            onClick={(e) => {
              handlePrevious();
              triggerRadiateEffect(e.currentTarget, 'rgba(41, 19, 210, 0.8)');
            }}
          />
        )}
        {/* Always show the right button unless on the last section */}
        {activeSection < sections.length - 1 && (
          <button
            className="nav-button right"
            onClick={(e) => {
              handleNext();
              triggerRadiateEffect(e.currentTarget, 'rgba(19, 210, 41, 0.8)');
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;