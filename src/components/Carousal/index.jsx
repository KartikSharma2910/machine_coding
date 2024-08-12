import React, { useEffect, useState } from "react";
import carousalData from "../../data/carousal";
import "./styles.css";

const Carousal = () => {
  const [index, setIndex] = useState(0);

  const handleNextClick = () => {
    setIndex((prev) => (prev + 1) % carousalData.length);
  };

  const handlePrevClick = () => {
    setIndex((prev) => (prev === 0 ? carousalData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick();
    }, 3000);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="wrapper">
      <div className="heading">Carousal</div>
      <div className="carousal-container">
        <button className="previous" onClick={handlePrevClick}>
          Previous
        </button>
        {carousalData.map((source, idx) => (
          <div
            className="image-wrapper"
            style={{ display: index !== idx ? "none" : "flex" }}
          >
            <img
              key={idx}
              className="image"
              src={source}
              alt="carousal-image"
            />
          </div>
        ))}
        <button className="next" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousal;
