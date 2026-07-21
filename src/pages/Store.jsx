import packs from "../data/packs";
import { uploadAnimation } from "../services/protocol";

function Store({ setPage }) {

    async function installDogPack() {

    try {

        const manifest = await fetch("/packs/dog/manifest.json")
            .then(r => r.json());

        for (let i = 0; i < manifest.animations.length; i++) {

            const anim = manifest.animations[i];

            console.log(`Installing ${i + 1}/${manifest.animations.length}`);

            const blob = await fetch("/packs/dog/" + anim.file)
                .then(r => r.blob());

            const file = new File(
                [blob],
                anim.file,
                {
                    type: "application/octet-stream"
                }
            );

            const ok = await uploadAnimation(file);

            if (!ok) {

                showToast("❌ Upload Failed", "error");

                return;

            }

        }

        alert("✅ Animation Pack Installed");

        setPage("setup");

    }
    catch (err) {

        console.error(err);

        alert("Installation Failed");

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

<p>{pack.description}</p>

                        <button
                            onClick={installDogPack}
                        >
                            ⬇ Install Pack
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