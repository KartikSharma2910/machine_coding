import React, { useState } from "react";
import "./styles.css";

const ToDoList = () => {
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);

  return (
    <div className="wrapper">
      <div className="heading">ToDoList</div>
      <div className="input-container">
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="add-button"
          onClick={() => {
            setTask((prev) => [...prev, value]), setValue("");
          }}
        >
          Add Task
        </button>
      </div>
      <div>
        {task.map((item, index) => (
          <div key={index}>
            ⦾ {item}{" "}
            <span
              className="delete"
              onClick={() => {
                const newTask = task.filter((_, idx) => idx !== index); // Corrected deletion logic
                setTask(newTask);
              }}
            >
              🗑️
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
