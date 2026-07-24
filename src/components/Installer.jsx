import "esp-web-tools";

function Installer({ onFinished }) {

  return (
    <div className="app">
      <div className="card">

        <h1>Install GSN Studio</h1>

        <esp-web-install-button
          manifest={`${import.meta.env.BASE_URL}firmware/manifest.json`}
          onStateChange={(ev) => {
            if (ev.detail.state === "installed") {
              localStorage.setItem("installed", "true");
              onFinished();
            }
          }}
        >
        </esp-web-install-button>

      </div>
    </div>
  );
}

export default Installer;