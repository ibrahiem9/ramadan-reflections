import React, { useState } from "react";
import CountdownTimer from "./components/CountdownTimer";
import dates from "./data/dates.json";

function App() {
  const { ramadanStartDate } = dates;

  const [activeSection, setActiveSection] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [fadeColor, setFadeColor] = useState('');
  const [sliderValues, setSliderValues] = useState({});
  const [submittedValues, setSubmittedValues] = useState([]);

  const handleInputChange = (category, value) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [category]: value,
    }));
  };

  const handleSubmit = (category) => {
    setSubmittedValues((prevValues) => [...prevValues, { [category]: sliderValues[category] }]);
    console.log("Submitted values:", { [category]: sliderValues[category] });
    // Reset slider value for the category after submission if needed
    setSliderValues((prevValues) => ({
      ...prevValues,
      [category]: 0,
    }));
    // Log the final submitted values
    console.log("All submitted values:", [...submittedValues, { category, value: sliderValues[category] }]);
  };

  const sectionsData = [
    {
      title: "Countdown to Ramadan",
      content: (
        <>
          <CountdownTimer targetDate={ramadanStartDate} />
          <p>Are you ready for Ramadan? 
            Use this tool to see how far you've come since last Ramadan, and set goals for the upcoming Ramadan.
            You can also see how people around you are doing! 
            Click the green to start.</p>
        </>
      ),
    },
    {
      title: "Reflections",
      content: (
        <p>The next few pages will ask you to score yourself on a scale of 1-10 on your activities since last Ramadan. 1 being "I haven't even tried to stay away from it", and 10 being "I've been able to stay completely away from it since last Ramadan or longer" </p>
      ),
    },
    {
      title: "Avoiding the Bad: Arrogance",
      question: "How difficult has it been for you to practice humility and put down your ego?",
      category: "Arrogance",
    },
    {
      title: "Avoiding the Bad: Witchcraft/Black Magic",
      question: "How hard have you tried to stay away from Alcohol or Drugs?",
      category: "Witchcraft/Black Magic",
    },
    {
      title: "Avoiding the Bad: Intoxicants (Alcohol and Drugs)",
      question: "How hard have you tried to stay away from intoxicants?",
      category: "Intoxicants",
    },
    {
      title: "Avoiding the Bad: Zina (Pre-marital or Extra-Marital Relations)",
      question: "How hard have you tried to stay away from Alcohol or Drugs?",
      category: "Zina",
    },
    {
      title: "Avoiding the Bad: Abuse",
      question: "Have you struggled with not verbally or physically abusing others (especially loved ones such as your spouse and children)?",
      category: "Abuse",
    },
    {
      title: "Avoiding the Bad: Gambling",
      question: "How hard have you tried to stay away from gambling or betting?",
      category: "Gambling",
    },
    {
      title: "Avoiding the Bad: Instigating Fights or Arguments",
      question: "Have you been the cause of many fights or have you tried to spread positivity and love?",
      category: "Instigating Fights or Arguments",
    },
    {
      title: "Avoiding the Bad: Spying",
      question: "How difficult have you found it to mind your own business and stay out of others' affairs?",
      category: "Spying",
    },
    {
      title: "Avoiding the Bad: Animal Abuse",
      question: "Have you struggled with not verbally or physically abusing animals?",
      category: "Animal Abuse",
    },
    {
      title: "Avoiding the Bad: Stealing",
      question: "Have you stayed away from taking what belongs to others?",
      category: "Stealing",
    },
    {
      title: "Avoiding the Bad: Lying",
      question: "How much have you engaged in lying, either to yourself or others?",
      category: "Lying",
    },
    {
      title: "Avoiding the Bad: Cheating",
      question: "How much have you engaged in cheating (in school, at work, in your business, etc)?",
      category: "Cheating",
    },
    {
      title: "Avoiding the Bad: Backbiting",
      question: "How difficult has it been for you not to speak about others behind their backs?",
      category: "Backbiting",
    },
    {
      title: "Avoiding the Bad: Riba (dealing with Usury)",
      question: "How hard have you tried to stay away from usury?",
      category: "Riba",
    },
    {
      title: "Avoiding the Bad: Slander",
      question: "How difficult has it been for you to speak lies about others behind their backs?",
      category: "Slander",
    },
    {
      title: "Avoiding the Bad: Haram Income (income from sources that are immoral or illegal)",
      question: "How hard have you tried to keep your income halal?",
      category: "Haram Income",
    },
    {
      title: "Avoiding the Bad: Disrespecting Parents",
      question: "Have you shown patience to your parents or harshness and disrespect?",
      category: "Disrespecting Parents",
    },
  ];

  const sections = sectionsData.map((section, index) => (
    <div className="section" key={index}>
      <h2>{section.title}</h2>
      {section.content}
      {section.question && (
        <>
          <p>{section.question}</p>
          <div className="slider-container">
            <span className="slider-label">0</span>
            <div className="slider-wrapper">
              <input
                type="range"
                min="0"
                max="10"
                value={sliderValues[section.category] || 0}
                onChange={(e) =>
                  handleInputChange(section.category, Number(e.target.value))
                }
                className="custom-slider"
                id={`slider-${section.category}`}
              />
              <div className="slider-value">{sliderValues[section.category] || 0}</div>
            </div>
            <span className="slider-label">10</span>
          </div>
          <p>Rate your progress in avoiding {section.category.toLowerCase()}.</p>
          <button className="submit-button" onClick={() => handleSubmit(section.category)}>Submit</button>
        </>
      )}
    </div>
  ));



  // const sections = [
  //   <div className="section">
  //     <h1>Countdown to Ramadan</h1>
  //     <CountdownTimer targetDate={ramadanStartDate} />
  //     <p>Are you ready for Ramadan? <br />
  //       Use this tool to see how far you've come since last Ramadan, and set goals for the upcoming Ramadan. <br /> 
  //       You can also see how people around you are doing! <br />
  //       Click the green to start.</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Reflections</h2>
  //     <p>The next few pages will ask you to score yourself on a scale of 1-10 on your activities since last Ramadan. 1 being "I haven't even tried to stay away from it", and 10 being "I've been able to stay completely away from it since last Ramadan or longer" </p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Arrogance</h2>
  //     <p>How difficult has it been for you to practice humility and put down your ego?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Witchcraft/Black Magic</h2>
  //     <p>How hard have you tried to stay away from Alcohol or Drugs?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Intoxicants (Alchohol and Drugs)</h2>
  //     <p>How hard have you tried to stay away from intoxicants?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Zina (Pre-marital or Extra-Marital Relations)</h2>
  //     <p>How hard have you tried to stay away from Alcohol or Drugs?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Abuse</h2>
  //     <p>Have you struggled with not verbally or physically abusing others (especially loves ones such as your spouse and children)?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Gambling</h2>
  //     <p>How hard have you tried to stay away from gambling or betting?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Instigitating Fights or Arguments</h2>
  //     <p>Have you been the cause of many fights or have you tried to spread positivity and love?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Spying</h2>
  //     <p>How difficult have you found it to mind your own business and stay out of others' affairs?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Animal Abuse</h2>
  //     <p>Have you struggled with not verbally or physically abusing animals?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Stealing</h2>
  //     <p>Have you stayed away from taking what belongs to others?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Lying</h2>
  //     <p>How much have you engaged in lying, either to yourself or others?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Cheating</h2>
  //     <p>How much have you engaged in cheating (in school, at work, in your business, etc)?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Backbiting</h2>
  //     <p>How difficult has it been for you not speak about others behind their backs?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Riba (dealing with Usury)</h2>
  //     <p>How hard have you tried to stay away from usury?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Slander</h2>
  //     <p>How difficult has it been for you speak lies about others behind their backs?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Avoiding the Bad: Haram Income (income from sources that immoral or illegal)</h2>
  //     <p>How hard have you tried to keep your income halal?</p>
  //   </div>,
  //   <div className="section">
  //       <h2>Avoiding the Bad: Disrespecting Parents</h2>
  //       <p>Have you shown patience to your parents or harshness and disprespect?</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Commitments</h2>
  //     <p>The next few pages will ask you to select your commitments for the upcoming Ramadan and the months after</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Personal Insights</h2>
  //     <p>See how you've progressed since last Ramadan!</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Community Insights</h2>
  //     <p>See how you compare to your community!</p>
  //   </div>,
  //   <div className="section">
  //     <h2>Share</h2>
  //     <p>Share your commitments with your friends and family!</p>
  //   </div>,
  // ];

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

  // TODO
  // Add scrollinn effect to the sections
  // Add the ability to save the scores (sliders or another way)
  // Add the ability to share the scores
  // Add the ability to compare the scores with others
  // Add the ability to set goals for the upcoming Ramadan
  // Add the ability to share the goals
  // Add the ability to see how others are doing
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