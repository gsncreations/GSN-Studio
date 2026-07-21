import "esp-web-tools";

function Installer() {
  return (
    <div className="app">
      <div className="card">
        <h1>Install GSN Studio</h1>

        <esp-web-install-button
          manifest="/firmware/manifest.json"
        />

      </div>
    </div>
  );
}

export default Installer;