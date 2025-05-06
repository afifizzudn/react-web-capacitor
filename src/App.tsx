import { useState } from "react";
import fireIcon from "./assets/fire-icon-3d.png";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  const notify = () => toast("Showing notification!");

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img height={400} src={fireIcon} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Web Test Capacitor</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={notify}>Notify!</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        powered by Vite + React + Capacitor + Afifizzudn
      </p>
      <ToastContainer />
    </>
  );
}

export default App;
