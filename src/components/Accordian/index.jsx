import React, { useState } from "react";
import "./styles.css";

const Accordian = () => {
  const [data, setData] = useState([
    {
      label: "Introduction",
      value: "Welcome to the world of programming.",
      expanded: false,
    },
    {
      label: "Chapter 1",
      value: "JavaScript is a versatile language.",
      expanded: false,
    },
    {
      label: "Chapter 2",
      value: "React is a popular front-end library.",
      expanded: false,
    },
    {
      label: "Chapter 3",
      value: "Node.js allows JavaScript to run on the server.",
      expanded: false,
    },
    {
      label: "Chapter 4",
      value: "CSS is used for styling web pages.",
      expanded: false,
    },
    {
      label: "Chapter 5",
      value: "HTML is the backbone of any web application.",
      expanded: false,
    },
    {
      label: "Chapter 6",
      value: "Version control with Git is essential for teamwork.",
      expanded: false,
    },
    {
      label: "Chapter 7",
      value: "APIs enable communication between different software systems.",
      expanded: false,
    },
    {
      label: "Chapter 8",
      value: "Testing ensures code quality and reduces bugs.",
      expanded: false,
    },
    {
      label: "Conclusion",
      value: "Learning never stops in the field of programming.",
      expanded: false,
    },
  ]);

  const handleToggle = (index) => {
    setData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  return (
    <div className="wrapper">
      <div className="heading">Accordian</div>
      <div className="accordian-wrapper">
        {data.map(({ label, value, expanded }, index) => (
          <div key={index} className="accordian-container">
            <div className="accordian-head" onClick={() => handleToggle(index)}>
              <div>{label}</div>
              <div>⬇</div>
            </div>
            {expanded && <div className="accordian-desc">{value}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordian;
