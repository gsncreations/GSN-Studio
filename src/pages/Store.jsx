import packs from "../data/packs";
import { uploadAnimation } from "../services/protocol";
import { useState } from "react";

function Store({ setPage, showToast }) {
const [installing, setInstalling] = useState(false);
const [progress, setProgress] = useState(0);
const [current, setCurrent] = useState(0);

const [total, setTotal] = useState(0);
const [success, setSuccess] = useState(false);

    async function installDogPack() {

        if (installing)
    return;

setInstalling(true);
        

    try {

        const manifest = await fetch(
    `${import.meta.env.BASE_URL}packs/dog/manifest.json`
)
            .then(r => r.json());
    setTotal(manifest.animations.length);
       for (let i = 0; i < manifest.animations.length; i++) {
   setCurrent(i + 1);
            const anim = manifest.animations[i];

            console.log(`Installing ${i + 1}/${manifest.animations.length}`);

            const blob = await fetch(
    `${import.meta.env.BASE_URL}packs/dog/${anim.bin}`
)
                .then(r => r.blob());
                console.log(anim.bin, blob.size);

      const file = new File(
    [blob],
    anim.bin,
     {
                    type: "application/octet-stream"
                }
            );

    const ok = await uploadAnimation(file, (percent) => {

    const overall =
        ((i + percent / 100) / manifest.animations.length) * 100;

    setProgress(Math.round(overall));

});

// Wait before starting the next animation
await new Promise(resolve => setTimeout(resolve, 500));

if (!ok) {
    throw new Error("Upload Failed");
}

        }

   setSuccess(true);

showToast("✅ Animation Pack Installed Successfully!", "success");

setTimeout(() => {

    window.dispatchEvent(
        new Event("animationsUpdated")
    );

    setPage("setup");

}, 1500);

    }
catch (err) {

    console.error(err);

    showToast("❌ Animation pack installation failed", "error");

}
finally {

    setInstalling(false);

}

}
    return (

        <div className="app">

            <div className="card">

                <h1>📦 Animation Store</h1>

<p className="subtitle">
Download and install animation packs for your ESP32.
</p>
{success && (
    <div
        style={{
            background: "#10b981",
            color: "white",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold"
        }}
    >
        ✅ Animation Pack Installed Successfully!
    </div>
)}  

                {packs.map((pack) => (
<div
    key={pack.id}
    className="store-card"
>

                        <video
                            src={pack.cover}
                            width="220"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />

                       <div className="packHeader">

    <h2>{pack.title}</h2>

    <span className="freeBadge">FREE</span>

</div>

<button
onClick={installDogPack}
disabled={installing}
style={{
opacity: installing ? 0.6 : 1,
cursor: installing ? "not-allowed" : "pointer"
}}
>
    {installing ? `Installing ${current}/${total}...` : "⬇ Install Pack"}
</button>

{installing && (
    <div
        style={{
            marginTop: 15,
            marginBottom: 15
        }}
    >
        <div
            style={{
                width: "100%",
                height: "10px",
                background: "#2d3748",
                borderRadius: "10px",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#10b981",
                    transition: "width 0.2s ease"
                }}
            />
        </div>

        <p
            style={{
                marginTop: 8,
                textAlign: "center",
                fontWeight: "bold"
            }}
        >
            {progress}% Complete
        </p>
    </div>
)}      

                        
                    </div>

                ))}

     <button
className="backBtn"
onClick={() => setPage("home")}
disabled={installing}
>
    ← Back
</button>

            </div>

        </div>

    );
}

export default Store;