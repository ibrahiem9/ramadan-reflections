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

  const [commitments, setCommitments] = useState({
    preDefined: {
      salah: false,
      quran: false,
      sadaqah: false,
    },
    customGoals: [],
  });

  const [newCustomGoal, setNewCustomGoal] = useState("");

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

  const handlePreDefinedToggle = (goal) => {
    setCommitments((prev) => ({
      ...prev,
      preDefined: {
        ...prev.preDefined,
        [goal]: !prev.preDefined[goal],
      },
    }));
  };

  const handleAddCustomGoal = () => {
    if (newCustomGoal.trim()) {
      setCommitments((prev) => ({
        ...prev,
        customGoals: [...prev.customGoals, newCustomGoal],
      }));
      setNewCustomGoal("");
    }
  };

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      {/* Timer Section */}
      <div className="section">
        <h1>Countdown to Ramadan</h1>
        <CountdownTimer targetDate={ramadanStartDate} />
      </div>

      {/* Reflection Section */}
      {Object.entries(reflectionData).map(([category, value]) => (
        <div className="section" key={category}>
        <h2>Reflection: {category}</h2>
        <div className="slider-container">
          <span className="slider-label">0</span>
          <div className="slider-wrapper">
            <input
              type="range"
              min="0"
              max="10"
              value={value}
              onChange={(e) =>
                handleInputChange(category, Number(e.target.value))
              }
              className="custom-slider"
              id={`slider-${category}`}
            />
            <div className="slider-value">{value}</div>
          </div>
          <span className="slider-label">10</span>
        </div>
        <p>Rate your progress in {category.toLowerCase()}.</p>
      </div>
      ))}

      {/* Commitments Section */}
      <div className="section">
        <h2>Commitments for Ramadan</h2>

        {/* Pre-defined Commitments */}
        <h3>Pre-defined Commitments</h3>
        <div>
          {Object.entries(commitments.preDefined).map(([goal, isSelected]) => (
            <div key={goal}>
              <label>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handlePreDefinedToggle(goal)}
                />
                {goal === "salah" && "Pray Salah on time"}
                {goal === "quran" && "Recite Quran daily"}
                {goal === "sadaqah" && "Give Sadaqah regularly"}
              </label>
            </div>
          ))}
        </div>

        {/* Custom Goals */}
        <h3>Custom Goals</h3>
        <div>
          <input
            type="text"
            value={newCustomGoal}
            placeholder="Add your custom goal"
            onChange={(e) => setNewCustomGoal(e.target.value)}
          />
          <button onClick={handleAddCustomGoal}>Add Goal</button>
        </div>

        <ul>
          {commitments.customGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
      </div>

      {/* Navigation Indicators */}
      <div className="indicator">
        {[...Array(5)].map((_, i) => (
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