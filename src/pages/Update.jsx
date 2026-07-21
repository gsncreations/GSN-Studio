import { useEffect } from "react";
import { disconnectUSB } from "../services/usb";

async function disconnectFirst() {
    await disconnectUSB();
}

function Update({ setPage }) {

    useEffect(() => {

        import("esp-web-tools");

    }, []);

    return (

        <div className="app">

            <div className="card">

                <div className="pageHeader">

                    <h1>🚀 Firmware Update</h1>

                    <p>Keep your ESP32 running the latest version of GSN Studio</p>

                </div>

                <div className="deviceCard">

    <div className="deviceRow">

        <span>💻 Current Version</span>

        <b>GSN Studio V1.0</b>

    </div>

    <div className="deviceRow">

        <span>🌐 Latest Version</span>

        <b>GSN Studio V1.0</b>

    </div>

    <div className="deviceRow">

        <span>📡 Status</span>

       <span className="statusSuccess">
    🟢 Up To Date
</span>

    </div>

</div>

                <div className="updateBox">

                    <h3>⚡ Install Firmware</h3>

                    <p>
                        Disconnect from USB before starting the installation.
                    </p>

                    <div
                        className="installButton"
                        onClick={disconnectFirst}
                    >

                        <esp-web-install-button
                            manifest="/firmware/manifest.json">
                        </esp-web-install-button>

                    </div>

                </div>

                <button
                    className="connectBtn secondaryBtn"
                    onClick={() => setPage("home")}
                >
                    ← Back to Home
                </button>

            </div>

        </div>

    );

}

export default Update;