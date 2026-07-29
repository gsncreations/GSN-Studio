function Home({ setPage }) {

    return (

        <div className="app">

            <div className="card">

               <div className="homeHeader">

    <div>

        <h1>GSN Studio</h1>

        <p className="subtitle">
            Professional ESP32 OLED Animation Studio
        </p>

    </div>

    <div className="statusBadge">

        🟢 Connected

    </div>

</div>

<div className="deviceBar">

    <div>
        <span>Firmware</span>
        <b> V1.0</b>
    </div>

    <div>
        <span>USB</span>
        <b> Connected</b>
    </div>

    <div>
        <span>Device</span>
        <b> ESP32</b>
    </div>

</div>

                <div className="grid">

                    <button
                        className="connectBtn"
                        onClick={() => setPage("device")}
                    >
                        💾 Device Info
                    </button>

                    <button
                        className="connectBtn"
                        onClick={() => setPage("store")}
                    >
                        📦 Animation Store
                    </button>

                    <button
                        className="connectBtn"
                        onClick={() => setPage("setup")}
                    >
                        ⚙️ Animation Settings
                    </button>

                    <button
                        className="connectBtn"
                        onClick={() => setPage("update")}
                    >
                        🔄 Update Firmware
                    </button>

                    <button
    className="connectBtn"
    onClick={() => setPage("settings")}
>
    ⚙️ Settings
</button>

                </div>

            </div>

        </div>

    );

}

export default Home;