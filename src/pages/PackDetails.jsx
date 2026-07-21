import { useEffect, useState } from "react";

export default function PackDetails({ setPage }) {

  const [pack, setPack] = useState(null);

  useEffect(() => {

    fetch("/packs/dog/manifest.json")
      .then(r => r.json())
      .then(setPack);

  }, []);

  if (!pack) return <h2>Loading...</h2>;

  return (

    <div className="app">

      <h1>{pack.name}</h1>

      {pack.animations.map(anim => (

        <div key={anim.id}
          style={{
            padding:20,
            marginBottom:15,
            border:"1px solid #333",
            borderRadius:10
          }}
        >

          <video
            src={"/preview/dog/"+anim.preview}
            width="220"
            autoPlay
            loop
            muted
          />

          <h3>{anim.name}</h3>

          <button>

            Install

          </button>

        </div>

      ))}

      <button onClick={()=>setPage("store")}>
        Back
      </button>

    </div>

  );

}