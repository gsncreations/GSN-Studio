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
        🎨
      </div>

      <h1>GSN Studio</h1>

      <p className="subtitle">
        Professional OLED Animation Studio
      </p>

      <div className="heroBox">

        <div className="heroRow">
          <span>Firmware</span>
          <b>V1.0</b>
        </div>

        <div className="heroRow">
          <span>Device</span>
          <b>ESP32 OLED</b>
        </div>

        <div className="heroRow">
          <span>Connection</span>
          <b>USB Serial</b>
        </div>

      </div>

      <button
        className="connectBtn"
        onClick={connect}
      >
        {connected ? "🟢 Device Connected" : "Connect ESP32"}
      </button>

      <div className="features">

        <div>✅ No Arduino IDE Required</div>

        <div>✅ Browser Based</div>

        <div>✅ Animation Manager</div>

      </div>

      <div className="footer">

        Made with ❤️ by GSN Creations

      </div>

    </div>
  </div>
);

<p className="footer">
    GSN Studio V1.0.0
    <br />
    © 2026 GSN Creations
</p>
}

export default App;