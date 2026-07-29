import { useState } from "react";
import Loading from "./components/Loading";
import Store from "./pages/Store";
import Setup from "./pages/Setup";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import Device from "./pages/Device";
import Update from "./pages/Update";
  
import Installer from "./components/Installer";
import Settings from "./pages/Settings";  

import Toast from "./components/Toast";
import { connectUSB } from "./services/usb";

function App() {

 const [installed, setInstalled] = useState(true);

  const [connected, setConnected] = useState(false);

  const [page, setPage] = useState("home");

  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(false);
const [loadingText, setLoadingText] = useState("Loading...");
 const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState("success");


function showToast(message, type = "success") {
    setToastType(type);
    setToastMessage(message);
}

  const [assignments, setAssignments] = useState({
    startup: null,
    singleTap: null,
    doubleTap: null,
    longPress: null,
  });

 async function connectDevice() {

    setLoadingText("Connecting to ESP32...");
    setLoading(true);

    try {

        const ok = await connectUSB();

        if (ok) {
            setConnected(true);
        } else {
            showToast("❌ Failed to connect ESP32", "error");
        }

    } finally {

        setLoading(false);

    }

}

  // ---------------- Installer ----------------

  if (!installed) {

    return (
      <Installer
        onFinished={() => {
          localStorage.setItem("installed", "true");
          setInstalled(true);
        }}
      />
    );

  }

  // ---------------- Connect ----------------

  if (!connected) {

    return (

      <div className="app">

        <div className="card">

          <h1>GSN Studio</h1>

          <button
            className="connectBtn"
            onClick={connectDevice}
          >
            Connect ESP32
          </button>

        </div>

      </div>

    );

  }

  // ---------------- Pages ----------------
return (
  <>
    {page === "home" && (
      <Home setPage={setPage} />
    )}

    {page === "device" && (
      <Device setPage={setPage} />
    )}

  {page === "setup" && (
  <Setup
    assignments={assignments}
    setCurrentEvent={setCurrentEvent}
    setPage={setPage}
    showToast={showToast}
  />
)}
    {page === "gallery" && (
      <Gallery
        currentEvent={currentEvent}
        assignments={assignments}
        setAssignments={setAssignments}
        setPage={setPage}
      />
    )}

   {page === "store" && (
  <Store
    setPage={setPage}
    showToast={showToast}
  />
)}

    {page === "update" && (
      <Update
        setPage={setPage}
      />
    )}

    
    {page === "settings" && (
  <Settings
    setPage={setPage}
  />
)}

    {page === "upload" && (
      <Upload
        setPage={setPage}
      />
    )}

    {loading && (
    <Loading text={loadingText} />
)}
    <Toast
    message={toastMessage}
    type={toastType}
    onClose={() => setToastMessage("")}
/>
  </>
);


}

export default App;