import React, { useState } from "react";
import "./styles.css";

const Stepper = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const stepperData = [
    {
      stepName: "Personal Details",
      Component: () => <div>Enter Your Personal Details</div>,
    },
    {
      stepName: "Educational Details",
      Component: () => <div>Enter Your Educational Details</div>,
    },
    {
      stepName: "Experience",
      Component: () => <div>Add Your Experience</div>,
    },
    {
      stepName: "Verify",
      Component: () => <div>KYC for verification</div>,
    },
  ];

  const ActiveComponent = stepperData[currentIndex - 1].Component;

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev === stepperData.length) {
        setIsCompleted(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <div className="wrapper">
      <div className="heading">Stepper Component</div>
      <div className="step-wrapper">
        {stepperData.map(({ stepName }, index) => (
          <div key={index} className="step">
            <div
              className={`number ${
                currentIndex === index + 1 ? "active" : ""
              } ${currentIndex > index + 1 || isCompleted ? "complete" : ""}`}
            >
              {currentIndex > index + 1 ? <span>&#10003;</span> : index + 1}
            </div>
            <div className="step-name">{stepName}</div>
          </div>
        ))}
      </div>
      <ActiveComponent />
      <button disabled={isCompleted} className="next-step" onClick={handleNext}>
        {currentIndex !== stepperData.length ? "Next Step" : "Finished"}
      </button>
    </div>
  );
};

export default Stepper;
