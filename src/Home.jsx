import { useState } from "react";
import "./index.css";
import { connectESP32 } from "./services/serial";

function App() {
  const [connected, setConnected] = useState(false);

  const connect = async () => {
    const ok = await connectESP32();

    if (ok) {
      setConnected(true);
    } else {
      alert("Failed to connect to ESP32.");
    }
  };

  return (
  <div className="app">
    <div className="card">

      <div className="logo">
        🐶
      </div>

      <h1>GSN Studio</h1>

      <p className="subtitle">
        Bring your OLED pet to life.
      </p>

      <div className="heroBox">

        <h3>Your Device</h3>

        <p style={{ fontSize: "18px", margin: "15px 0" }}>
          {connected ? "🟢 Connected" : "🔴 Not Connected"}
        </p>

        <p>
          {connected
            ? "Your pet is ready!"
            : "Connect your device to begin."}
        </p>

      </div>

      <button
        className="connectBtn"
        onClick={connect}
      >
        {connected ? "✅ Device Connected" : "🔌 Connect Device"}
      </button>

      <div className="features">

        <div>✨ No Software Installation</div>

        <div>✨ Easy Animation Setup</div>

        <div>✨ One Click Upload</div>

      </div>

      <div className="footer">
        Made with ❤️ by GSN Creations
      </div>

    </div>
  </div>
);


}

export default App;