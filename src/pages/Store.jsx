import packs from "../data/packs";
import { uploadAnimation } from "../services/protocol";
import { useState } from "react";

function Store({ setPage }) {
const [installing, setInstalling] = useState(false);
    async function installDogPack() {

        if (installing)
    return;

setInstalling(true);
        

    try {

        const manifest = await fetch(
    `${import.meta.env.BASE_URL}packs/dog/manifest.json`
)
            .then(r => r.json());

       for (let i = 0; i < manifest.animations.length; i++) {

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

    const ok = await uploadAnimation(file);

// Wait before starting the next animation
await new Promise(resolve => setTimeout(resolve, 500));

if (!ok) {
    throw new Error("Upload Failed");
}

        }

        alert("✅ Animation Pack Installed");
        setPage("setup");

    }
catch (err) {

    console.error(err);

    alert("Installation Failed");

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
>
    {installing ? "Installing..." : "⬇ Install Pack"}
</button>       

                        
                    </div>

                ))}

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

export default Store;