import React, { useState } from "react";
import "./styles.css";

const ReverseLights = () => {
  const [current, setCurrent] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const Cell = ({ onClick, selected, isDisabled }) => {
    return (
      <button
        type="button"
        className="cell"
        onClick={onClick}
        disabled={isDisabled}
        style={{
          backgroundColor: selected ? "green" : "transparent",
        }}
      />
    );
  };

  const deActivateCells = () => {
    setIsDeactivating(true);

    const timer = setInterval(() => {
      setCurrent((prev) => {
        const newOrder = prev.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };

  const handleClick = (index) => {
    const newBoard = [...current, index];
    setCurrent(newBoard);

    if (newBoard.length === config.flat(1).filter(Boolean).length) {
      deActivateCells();
    }
  };

  return (
    <div className="wrapper">
      <div className="heading">ReverseLights</div>
      <div className="grid">
        {config
          .flat(1)
          .map((value, index) =>
            value ? (
              <Cell
                key={index}
                isDisabled={current.includes(index) || isDeactivating}
                selected={current.includes(index)}
                onClick={() => handleClick(index)}
              />
            ) : (
              <span />
            )
          )}
      </div>
    </div>
  );
};

export default ReverseLights;
