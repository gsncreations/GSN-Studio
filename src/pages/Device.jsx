import { useEffect, useState } from "react";
import { getAnimationList } from "../services/protocol";

function Device({ setPage }) {

    const [animations, setAnimations] = useState([]);
    const [manifest, setManifest] = useState(null);

    async function refresh() {

        try {

            const list = await getAnimationList();
            setAnimations(list);

        }
        catch {

            alert("Failed to read device information.");

        }

    }

    useEffect(() => {

        refresh();
        fetch(`${import.meta.env.BASE_URL}packs/dog/manifest.json`)
    .then(res => res.json())
    .then(data => setManifest(data));

    }, []);

    return (

        <div className="app">

            <div className="card">

                <div className="pageHeader">

                    <h1>💾 Device Information</h1>

                    <p>Overview of your connected ESP32 device</p>

                </div>

                <div className="infoGrid">

                    <div className="infoBox">

                        <div className="infoIcon">🟢</div>

                        <h3>Connected</h3>

                        <p>ESP32 Ready</p>

                    </div>

                    <div className="infoBox">

                        <div className="infoIcon">💻</div>

                        <h3>Firmware</h3>

                        <p>GSN Studio V1.0</p>

                    </div>

                    <div className="infoBox">

                        <div className="infoIcon">📦</div>

                        <h3>Animations</h3>

                        <p>{animations.length}</p>

                    </div>

                </div>

                <h3 style={{ marginBottom: "18px" }}>

                    📂 Installed Animation Files

                </h3>

                {animations.length === 0 ? (

                    <div style={{ textAlign: "center", color: "#9ca3af", padding: "30px 0" }}>
    <h3>📂 No animations installed</h3>
    <p>Visit the Store to install animation packs.</p>
</div>

                ) : (

                    animations.map((name, index) => (

    <div
        key={index}
        className="fileCard"
    >

        🎬 {name.replace(".bin", "").replace(/^anim\d+/i, "Animation")}

    </div>

))

                )}

                <button
                    className="connectBtn"
                    onClick={refresh}
                >

                    🔄 Refresh Device

                </button>

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

export default Device;