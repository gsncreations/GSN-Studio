function About({ setPage }) {

    return (

        <div className="app">

            <div className="card">

                <div className="pageHeader">

                    <h1>🚀 GSN Studio</h1>

                    <p>ESP32 Animation Management Software</p>

                </div>

                <div className="deviceCard">

                    <div className="deviceRow">
                        <span>📦 Version</span>
                        <b>V1.0.0</b>
                    </div>

                    <div className="deviceRow">
                        <span>👨‍💻 Developer</span>
                        <b>GSN Creations</b>
                    </div>

                    <div className="deviceRow">
                        <span>💻 Platform</span>
                        <b>ESP32 + OLED Display</b>
                    </div>

                    <div className="deviceRow">
                        <span>⚡ License</span>
                        <b>Free for Personal Use</b>
                    </div>

                </div>

                <div className="updateBox">

                    <h3>✨ Features</h3>

                    <p>✔ Browser USB Connection</p>
                    <p>✔ Animation Gallery</p>
                    <p>✔ Animation Store</p>
                    <p>✔ Firmware Update</p>
                    <p>✔ Animation Assignment</p>

                </div>

                <div className="updateBox">

                    <h3>🌐 Follow GSN Creations</h3>

                    <p>📺 YouTube</p>
                    <p>📷 Instagram</p>
                    <p>💻 GitHub</p>

                </div>

                <p
                    style={{
                        textAlign: "center",
                        color: "#9ca3af",
                        marginBottom: "20px"
                    }}
                >
                    © 2026 GSN Creations
                </p>

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

export default About;