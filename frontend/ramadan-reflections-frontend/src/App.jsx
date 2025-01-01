import React, { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import dates from "./data/dates.json";

function App() {
  const { ramadanStartDate } = dates; // Fetch the target date from the dates object

  const [activeSection, setActiveSection] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [reflectionData, setReflectionData] = useState({
    "Avoiding Sins": 5, // Default values for sliders
    "Obligatory Worship": 5,
    "Optional Worship": 5,
  });

  const handleScroll = (e) => {
    const sectionIndex = Math.round(e.target.scrollTop / window.innerHeight);
    setActiveSection(sectionIndex);
  };

  const handleInputChange = (category, value) => {
    const updatedData = { ...reflectionData, [category]: value };
    setReflectionData(updatedData);

    const allCompleted = Object.values(updatedData).every((value) => value > 0);
    setIsComplete(allCompleted);
  };

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      {/* Timer Section */}
      <div className="section">
        <h1>Countdown to Ramadan</h1>
        <CountdownTimer targetDate={ramadanStartDate} />
      </div>

      {/* Reflection Section */}
      <div className="section">
        <h2>Reflection: Avoiding Sins</h2>
        <input
          type="range"
          min="1"
          max="10"
          value={reflectionData["Avoiding Sins"]}
          onChange={(e) =>
            handleInputChange("Avoiding Sins", Number(e.target.value))
          }
        />
        <p>Rate your progress in avoiding sins (e.g., backbiting, lying).</p>
      </div>

      <div className="section">
        <h2>Reflection: Obligatory Worship</h2>
        <input
          type="range"
          min="1"
          max="10"
          value={reflectionData["Obligatory Worship"]}
          onChange={(e) =>
            handleInputChange("Obligatory Worship", Number(e.target.value))
          }
        />
        <p>Rate your progress in obligatory worship (e.g., salah, zakat).</p>
      </div>

      <div className="section">
        <h2>Reflection: Optional Worship</h2>
        <input
          type="range"
          min="1"
          max="10"
          value={reflectionData["Optional Worship"]}
          onChange={(e) =>
            handleInputChange("Optional Worship", Number(e.target.value))
          }
        />
        <p>Rate your progress in optional worship (e.g., sunnah prayers, sadaqah).</p>
      </div>

      {/* Validation Feedback */}
      {!isComplete && (
        <div style={{ textAlign: "center", color: "red" }}>
          <p>Please complete all reflection fields before proceeding.</p>
        </div>
      )}

      {/* Navigation Indicators */}
      <div className="indicator">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`indicator-dot ${activeSection === i ? "active" : ""}`}
            onClick={() =>
              document
                .querySelector(`.scroll-container`)
                .scrollTo({ top: i * window.innerHeight, behavior: "smooth" })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;