import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import "./styles.css";

const ToastComponent = ({
  type = "info",
  message = "This is a info Message",
  onClose = () => {},
}) => {
  const icons = {
    success: <AiOutlineCheckCircle />,
    error: <AiOutlineCloseCircle />,
    info: <AiOutlineInfoCircle />,
    warning: <AiOutlineWarning />,
  };

  return (
    <div className={`notification ${type}`}>
      <div className="data-container">
        <div>{icons[type]}</div>
        <div className="message">{message}</div>
      </div>
      <div>
        <AiOutlineClose color="white" onClick={() => onClose()} />
      </div>
    </div>
  );
};

export default ToastComponent;
