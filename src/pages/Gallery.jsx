import { useEffect, useState } from "react";

function Gallery({
  setPage,
  currentEvent,
  assignments,
  setAssignments,
}) {
  const [manifest, setManifest] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetch(
        `${import.meta.env.BASE_URL}packs/dog/manifest.json`
      ).then((r) => r.json());

      setManifest(data);
    }

    load();
  }, []);

  function selectAnimation(name) {
    const id =
      manifest.animations.findIndex((a) => a.bin === name) + 1;

    setAssignments({
      ...assignments,
      [currentEvent]: id,
    });

    setPage("setup");
  }

  return (
    <div className="app">
      <div className="card">
        <h1>🎬 Animation Gallery</h1>

        <p className="subtitle">
          Select an animation for this event.
        </p>

        <div className="galleryGrid">
          {manifest?.animations.map((anim) => (
            <div className="galleryCard" key={anim.id}>
              <video
                src={`${import.meta.env.BASE_URL}${anim.preview}`}
                autoPlay
                muted
                loop
                playsInline
              />

              <h3>{anim.name}</h3>

              <p>{manifest.packName}</p>

              <button
                className="selectBtn"
                onClick={() => selectAnimation(anim.bin)}
              >
                ✓ Select Animation
              </button>
            </div>
          ))}
        </div>

        <button
          className="backBtn"
          onClick={() => setPage("setup")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Gallery;