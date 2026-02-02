const DAYS = [
  "All",
  "Rose Day",
  "Propose Day",
  "Chocolate Day",
  "Teddy Day",
  "Promise Day",
  "Hug Day",
  "Valentine's Day"
];

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-bar">
      {DAYS.map(day => (
        <button
          key={day}
          className={filter === day ? "active" : ""}
          onClick={() => setFilter(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
