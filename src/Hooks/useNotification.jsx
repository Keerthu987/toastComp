// hooks/useNotifications.js
import { useCallback, useEffect, useRef, useState } from "react";
import Notification from "../Components/Notification";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const useNotifications = (position = "top-right") => {
  const [list, setList] = useState([]); // array of notification objects
  const timersRef = useRef({}); // { [id]: timeoutId }

  // cleanup all timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((t) => clearTimeout(t));
      timersRef.current = {};
    };
  }, []);

  const remove = useCallback((id) => {
    setList((prev) => prev.filter((n) => n.id !== id));
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const add = useCallback((props) => {
    const id = props.id ?? uid();
    const duration = props.duration ?? 3000;
    const item = { id, ...props, duration };
    // newest first
    setList((prev) => [item, ...prev]);

    // start timer to auto-remove
    timersRef.current[id] = setTimeout(() => {
      remove(id);
    }, duration);

    return id;
  }, [remove]);

  const NotificationComponent = list.length ? (
    <div className={`notification-wrapper ${position}`} style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      position: "fixed",
      zIndex: 9999,
      top: position.includes("top") ? 20 : "auto",
      bottom: position.includes("bottom") ? 20 : "auto",
      left: position.includes("left") ? 20 : "auto",
      right: position.includes("right") ? 20 : "auto",
    }}>
      {list.map((n) => (
        <Notification
          key={n.id}
          {...n}
          onClose={() => remove(n.id)}
        />
      ))}
    </div>
  ) : null;

  return { NotificationComponent, notify: add, remove, list };
};

export default useNotifications;
