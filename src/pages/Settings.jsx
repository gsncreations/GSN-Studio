function Settings({ setPage }) {
  return (
    <div className="app">
      <div className="card">

        <h1>⚙️ Settings</h1>

        <p className="subtitle">
          GSN Studio Preferences
        </p>

        <div className="deviceBar">

          <div>
            <span>Version</span>
            <b>V1.0</b>
          </div>

          <div>
            <span>Developer</span>
            <b>GSN Creations</b>
          </div>

          <div>
            <span>Status</span>
            <b>Stable</b>
          </div>

        </div>

        <button
          className="storeBtn"
          onClick={() =>
            window.open(
              "https://youtube.com/@GSNcreation07",
              "_blank"
            )
          }
        >
          ▶ YouTube
        </button>

        <button
          className="storeBtn"
          onClick={() =>
            window.open(
              "https://instagram.com/g.s.n.creations",
              "_blank"
            )
          }
        >
          📷 Instagram
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

export default Settings;