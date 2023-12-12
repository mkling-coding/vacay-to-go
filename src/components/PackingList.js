import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onGeneratePreset,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  const [preset, setPreset] = useState("none");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "description") {
    // Sort mutates original array so we use to slice to make a copy of the items array
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {/* Maps through the array in our items state and displays them */}
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <select
          value={preset}
          onChange={(e) => {
            setPreset(e.target.value);
            onGeneratePreset(e.target.value);
          }}
        >
          <option value="none">Generate preset</option>
          <option value="weekend">Weekend getaway</option>
          <option value="camping">4-night camping trip</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
