import useNotifications from "./Hooks/useNotification";
import "./App.css";

const App = () => {
  const { NotificationComponent, notify } = useNotifications("top-right");

  // ✅ If you want to show a toast once on load:
  // useEffect(() => {
  //   notify({ type: "success", message: "Saved!", duration: 4000 });
  // }, []);

  return (
    <div className="App">
      {NotificationComponent}
      <h1>ToastComponent</h1>
      <div className="btns">
        <button
          onClick={() =>
            notify({
              type: "success",
              message: "This is a success message",
              duration: 3000,
              animation: "pop",
            })
          }
        >
          Success
        </button>

        <button
          onClick={() =>
            notify({
              type: "info",
              message: "This is an info message!",
              duration: 3000,
            })
          }
        >
          Info
        </button>

        <button
          onClick={() =>
            notify({
              type: "warning",
              message: "This is a warning message!",
              duration: 3000,
            })
          }
        >
          Warning
        </button>

        <button
          onClick={() =>
            notify({
              type: "error",
              message: "This is an error message!",
              duration: 3000,
            })
          }
        >
          Error
        </button>
      </div>
    </div>
  );
};

export default App;
