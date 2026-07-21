import AnimationCard from "./AnimationCard";

function CategorySection({
  title,
  animations,
  selected,
  onSelect,
}) {
  return (
    <div className="category-section">

      <h2>{title}</h2>

      <div className="animation-grid">

        {animations.map((animation) => (

          <AnimationCard
            key={animation.id}
            animation={animation}
            selected={selected?.id === animation.id}
            onSelect={onSelect}
          />

        ))}

      </div>

    </div>
  );
}

export default CategorySection;