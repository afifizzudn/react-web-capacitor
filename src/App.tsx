import { useState } from "react";
import fireIcon from "./assets/fire-icon-3d.png";
import { Device } from "@t-universe/bridge-dev/plugins/device";
import { Network } from "@t-universe/bridge-dev/plugins/network";
import {
  Camera,
  CameraResultType,
} from "@t-universe/bridge-dev/plugins/camera";
import { WebConsoleSDK } from "web-console-sdk";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [toastify, setToastify] = useState<string | null>(null);
  const [consoleLog, setConsoleLog] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDeviceInfo = async () => {
    setIsLoading(true);
    try {
      const info = await Device.getInfo();
      resetState();
      setToastify(JSON.stringify(info));
    } catch (error: any) {
      console.error("Error in getDeviceInfo:", error);
      setError(`Error: ${error.message || error}`);
      setToastify(`Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getNetworkInfo = async () => {
    setIsLoading(true);
    try {
      const info = await Network.getStatus();
      resetState();
      setToastify(JSON.stringify(info));
    } catch (error: any) {
      console.error("Error in getNetworkInfo:", error);
      setError(`Error: ${error.message || error}`);
      setToastify(`Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceId = async () => {
    setIsLoading(true);
    try {
      const id = await Device.getId();
      resetState();
      setToastify(JSON.stringify(id));
    } catch (error: any) {
      console.error("Error in getDeviceId:", error);
      setError(`Error: ${error.message || error}`);
      setToastify(`Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitConsole = async () => {
    setIsLoading(true);
    const consoleId = "C3K2F6BJ";
    try {
      const result = await WebConsoleSDK.initConsole({ id: consoleId });
      resetState();
      setToastify(JSON.stringify(result));
    } catch (error: any) {
      console.error("Error in getInitConsole:", error);
      setError(`Error: ${error.message || error}`);
      setToastify(`Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getPermission = async () => {
    setIsLoading(true);
    try {
      const result = await WebConsoleSDK.getPermission();
      resetState();
      setToastify(JSON.stringify(result));
    } catch (error: any) {
      console.error("Error in getPermission:", error);
      setError(`Error: ${error.message || error}`);
      setToastify(`Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getTest = async () => {
    setIsLoading(true);
    try {
      const result = await WebConsoleSDK.test();
      resetState();
      setToastify(JSON.stringify(result));
    } catch (error: any) {
      console.error("Error in getTest:", error);
      setError(`Error: ${error.message || error}`);
      setToastify(`Error: ${error.message || error}`); // Menampilkan error di toastify
    } finally {
      setIsLoading(false);
    }
  };

  const takePicture = async () => {
    setIsLoading(true);
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });

      if (image && image.webPath) {
        setImageUrl(image.webPath);
        setConsoleLog(`Image captured: ${JSON.stringify(image)}`);
      } else {
        throw new Error("Invalid image data");
      }
    } catch (error: any) {
      console.error("Error in takePicture:", error);
      setError(`Error capturing image: ${error.message || error}`);
      setToastify(`Error capturing image: ${error.message || error}`);
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setImageUrl("");
    setConsoleLog("");
    setToastify(null);
    setError("");
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img
            height={400}
            src={fireIcon}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Web Test Capacitor</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={getDeviceInfo} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Device Info"}
        </button>
        <button onClick={getDeviceId} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get ID"}
        </button>
        <button onClick={getInitConsole} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get InitConsole"}
        </button>
        <button onClick={getPermission} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Permission"}
        </button>
        <button onClick={getNetworkInfo} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Network Info"}
        </button>
        <button onClick={getTest} disabled={isLoading}>
          {isLoading ? "Loading..." : "Test"}
        </button>
        <button onClick={takePicture} disabled={isLoading}>
          {isLoading ? "Loading..." : "Open Camera"}
        </button>
        <button onClick={resetState}>Reset State</button>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Captured"
            style={{ width: "200px", height: "auto" }}
          />
        )}

        <div
          style={{
            maxWidth: "300px",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            border: "1px solid #ccc",
            padding: "10px",
            visibility: toastify || consoleLog ? "visible" : "hidden",
          }}
        >
          {toastify && JSON.stringify(toastify)}
          {consoleLog && <pre>{consoleLog || error}</pre>}
        </div>
      </div>
      <p className="read-the-docs">powered by Vite + React + Capacitor</p>
      <p className="read-the-docs">Copyright @afifizzudn v.1.1.9</p>
    </>
  );
}

export default App;
