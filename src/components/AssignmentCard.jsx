function AssignmentCard({ event, animation, onSelect }) {

  return (

    <div className="assignment-card">

      <div className="assignment-left">

        <h3>{event.title}</h3>

        {animation ? (

          <div className="selected-animation">

            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >
              {animation}
            </span>

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