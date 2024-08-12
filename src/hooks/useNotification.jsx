import { useCallback, useState } from "react";
import { ToastComponent } from "../components";

const useNotification = (position = "top-right") => {
  const [notification, setNotification] = useState();

  let timer;
  const triggerNotification = useCallback((notificationProps) => {
    clearTimeout(timer);
    setNotification(notificationProps);

    timer = setTimeout(() => setNotification(null), notificationProps.duration);
  }, []);

  const NotificationComponent = notification ? (
    <div className={`${position}`}>
      <ToastComponent {...notification} />
    </div>
  ) : null;

  return { triggerNotification, NotificationComponent };
};
export default useNotification;
