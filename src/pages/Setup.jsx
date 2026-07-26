import events from "../data/events";
import AssignmentCard from "../components/AssignmentCard";
import { buildSettings } from "../services/settings";
import { sendJSON, getDeviceInfo } from "../services/protocol";

function Setup({
  assignments,
  setCurrentEvent,
  setPage,
}) {

  async function saveSettings() {
    const [deviceInfo, setDeviceInfo] = useState(null);

async function refreshDeviceInfo() {
  try {
    const info = await getDeviceInfo();
    setDeviceInfo(info);
  } catch (e) {
    alert("Unable to read device information.");
  }
}

    const settings = buildSettings(assignments);

    console.log("Settings");
    console.log(settings);

    const success = await sendJSON(settings);

    if (!success) {
      alert("Failed to send settings.");
    }
  }

  return (

    <div className="app">

      <div className="card">

       <h1>Animation Setup</h1>

<p className="subtitle">
    Configure animations for your ESP32 events.
</p>

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

        {/* Upload Animation Button */}
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

       <button
    className="storeBtn"
    onClick={saveSettings}
>
  <div
  style={{
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    background: "#1f2937",
    color: "white",
  }}
>
  <h3>Device Information</h3>

  {deviceInfo ? (
    <>
      <p>Firmware: {deviceInfo.firmware}</p>
      <p>Chip: {deviceInfo.chip}</p>
      <p>Animations: {deviceInfo.animations}</p>
      <p>
        LittleFS:{" "}
        {(deviceInfo.littlefs_used / 1024).toFixed(1)} KB /{" "}
        {(deviceInfo.littlefs_total / 1024).toFixed(1)} KB
      </p>
    </>
  ) : (
    <p>No information loaded.</p>
  )}

  <button
    className="storeBtn"
    onClick={refreshDeviceInfo}
  >
    🔄 Refresh Device Info
  </button>
</div>
    💾 Save Changes
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