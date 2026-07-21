import { useState } from "react";
// import { uploadBinary } from "../services/protocol";
import { getAnimationList } from "../services/protocol";

function Upload({ setPage }) {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [installed, setInstalled] = useState([]);

  function chooseFile(e) {

    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }

  }

  async function uploadAnimation() {

    if (!file) {
      alert("Select a .bin animation first.");
      return;
    }

    setUploading(true);

    alert("Upload feature moved to Installer.");
setUploading(false);
return;

    setUploading(false);

    if (success) {

      alert("✅ Upload Complete!");

    } else {

      alert("❌ Upload Failed");

    }

  }

  return (

    <div className="card">

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>
    <br />

<button
onClick={refreshAnimations}
>

Refresh Installed Animations

</button>

<h2>Upload Animation</h2>

<button
  onClick={() => setPage("setup")}
>
Back
</button>

</div>
      <input
        type="file"
        accept=".bin"
        onChange={chooseFile}
        disabled={uploading}
      />

      <br />
      <br />

      {file && (

        <>

          <p>

            <b>Name:</b> {file.name}

          </p>

          <p>

            <b>Size:</b>{" "}
            {(file.size / 1024).toFixed(2)} KB

          </p>

        </>

      )}
      <h3>

Installed Animations

</h3>

<ul>

{installed.map((item)=>(
<li key={item}>
{item}
</li>
))}

</ul>

      <button
        onClick={uploadAnimation}
        disabled={uploading}
      >

        {uploading ? "Uploading..." : "Upload"}

      </button>

    </div>
    

  );
  async function refreshAnimations() {

    const list =
        await getAnimationList();

    setInstalled(list);

}



}

export default Upload;