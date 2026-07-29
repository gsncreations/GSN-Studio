
import animations from "../data/animations";

function AssignmentCard({ event, animation, onSelect }) {
  

const selectedAnimation = animations.find(
  (item) => Number(item.id) === Number(animation)
);


  return (

    <div className="assignment-card">

      <div className="assignment-left">

        <h3>{event.title}</h3>

        {animation ? (

          <div
  className="selected-animation"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "10px"
  }}
>

  {selectedAnimation && (
    <video
      src={selectedAnimation.preview}
      autoPlay
      muted
      loop
      playsInline
      style={{
        width: "70px",
        height: "70px",
        objectFit: "cover",
        borderRadius: "10px",
        border: "2px solid #3b82f6"
      }}
    />
  )}

  <div>
    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold"
      }}
    >
      🐶 {selectedAnimation?.title}
    </div>

    <div
      style={{
        color: "#888",
        fontSize: "14px"
      }}
    >
      Ready to use
    </div>
  </div>

</div>

        ) : (

          <p>No Animation Selected</p>

        )}

      </div>

      <button onClick={onSelect}>
        {animation ? "Change" : "Select"}
      </button>

    </div>

  );
}

export default AssignmentCard;