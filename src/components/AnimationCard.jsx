import "../styles/AnimationCard.css";
import { playAnimation } from "../services/protocol";

function AnimationCard({ animation, selected, onSelect }) {
  return (
    <div
      className={`animation-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(animation)}
    >
      <video
        className="animation-preview"
        src={animation.preview}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="animation-title">
        {animation.title}
      </div>

      <div className="animation-status">
        {selected ? "✓ Selected" : `ID ${animation.id}`}
      </div>
      <button
onClick={(e)=>{

e.stopPropagation();

playAnimation(animation.id);

}}

>

▶ Play

</button>
    </div>
  );
}

export default AnimationCard;