import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  if (!timeLeft) {
    return <div>The countdown has ended!</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.timer}>
        <span style={styles.number}>{timeLeft.days}</span>
        <span style={styles.label}>Days</span>
      </div>
      <div style={styles.timer}>
        <span style={styles.number}>{timeLeft.hours}</span>
        <span style={styles.label}>Hours</span>
      </div>
      <div style={styles.timer}>
        <span style={styles.number}>{timeLeft.minutes}</span>
        <span style={styles.label}>Minutes</span>
      </div>
      <div style={styles.timer}>
        <span style={styles.number}>{timeLeft.seconds}</span>
        <span style={styles.label}>Seconds</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    fontFamily: "'Arial', sans-serif",
    color: "#3C3C3C",
  },
  timer: {
    textAlign: "center",
  },
  number: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#F4A261",
  },
  label: {
    fontSize: "1rem",
    color: "#264653",
  },
};

export default CountdownTimer;