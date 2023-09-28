import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => {
    setToasts([]);
  });

  function toggleToast(variant, message) {
    const nextToasts = [...toasts];
    nextToasts.push({ variant, message, id: Math.random() });
    setToasts(nextToasts);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toggleToast, handleDismiss, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

function useEscapeKey(callback) {
  React.useEffect(() => {
    console.log("effect runs");
    function onEscape(event) {
      if (event.keyCode === 27) {
        callback(event);
      }
    }

    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [callback]);
}

export default ToastProvider;
