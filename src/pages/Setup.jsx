import { useState, useEffect } from "react";
import events from "../data/events";
import AssignmentCard from "../components/AssignmentCard";
import { buildSettings } from "../services/settings";
import { sendJSON, getDeviceInfo } from "../services/protocol";

function Setup({
  assignments,
  setCurrentEvent,
  setPage,
  showToast,
}) {

  const [deviceInfo, setDeviceInfo] = useState(null);
  const [saved, setSaved] = useState(false);

  async function saveSettings() {

    const settings = buildSettings(assignments);

    console.log("Assignments:", assignments);
console.log("Settings:", settings);

    const success = await sendJSON(settings);

    console.log("Save Result:", success);

    if (success) {

        setSaved(true);

       setTimeout(() => {
    setSaved(false);
}, 1500);

    } else {
showToast("✅ Setup saved successfully", "success");
        showToast("❌ Failed to save setup", "error");

    }

  }

  async function refreshDeviceInfo() {

    try {

      const info = await getDeviceInfo();

      setDeviceInfo(info);

    } catch (e) {

      console.error(e);

      showToast("❌ Unable to read device information", "error");

    }

  }

 useEffect(() => {

    refreshDeviceInfo();

    function refresh() {
        refreshDeviceInfo();
    }

    window.addEventListener(
        "animationsUpdated",
        refresh
    );

    return () =>
        window.removeEventListener(
            "animationsUpdated",
            refresh
        );

}, []);

  return (

    <div className="app">

      <div className="card">

        <h1>Animation Setup</h1>

        <p className="subtitle">
          Configure animations for your ESP32 events.
        </p>
       {saved && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#10b981",
      color: "#fff",
      padding: "22px 40px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
      fontSize: "20px",
      fontWeight: "bold",
      zIndex: 9999
    }}
  >
    ✅ Setup Saved Successfully!
  </div>
)}

        <div className="deviceBar">

          <div>
            <span>Startup</span>
            <b>{assignments.startup ? "Assigned" : "Not Set"}</b>
          </div>

          <div>
            <span>Single Tap</span>
            <b>{assignments.singleTap ? "Assigned" : "Not Set"}</b>
          </div>

          <div>
            <span>Double Tap</span>
            <b>{assignments.doubleTap ? "Assigned" : "Not Set"}</b>
          </div>

        </div>

        <button
          onClick={() => setPage("store")}
          style={{
            width: "100%",
            padding: "16px",
            marginBottom: "25px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "12px",
            background: "#10b981",
            color: "white",
            cursor: "pointer"
          }}
        >
          📦 Animation Store
        </button>

        {events.map((event) => (

          <AssignmentCard
            key={event.id}
            event={event}
            animation={assignments[event.id]}
            onSelect={() => {

              setCurrentEvent(event.id);

              setPage("gallery");

            }}
          />

        ))}

        <div
          style={{
            marginTop: 25,
            padding: 16,
            borderRadius: 12,
            background: "#1f2937",
            color: "white"
          }}
        >

          <h3>Your Device</h3>

          {deviceInfo ? (

            <>

              <p><strong>🟢 Device Connected</strong></p>

<p><strong>📦 Installed Animations:</strong> {deviceInfo.animations}</p>

<p><strong>✨ Status:</strong> Ready</p>

            </>

          ) : (

            <p>No information loaded.</p>

          )}

        </div>

        <button
  className="storeBtn"
  onClick={refreshDeviceInfo}
>
  🔄 Refresh
</button>

  <button
  className="storeBtn"
  onClick={saveSettings}
>
  ✅ Save Setup
</button>
        <button
          className="backBtn"
          onClick={() => setPage("home")}
        >
          ← Back
        </button>

      </div>

    </div>

  );

}

export default Setup;