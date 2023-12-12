import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { presets } from "../presets";

export default function App() {
  // Items state that is used to keep track of items that we have added to our travel list
  const [items, setItems] = useState([]);

  // Adds item from <Form /> to our items state
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // Delete item from items array
  function handleDeleteItem(id) {
    // Filters through the items array and adds item to items array as long as the item ID isn't equal to the ID passed into the function
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // Changes packed property in item object
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // Deletes all items in items array
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) {
      setItems([]);
    }
  }

  // Generates a preset items array
  function handleGeneratePreset(preset) {
    if (preset === "none") {
      setItems([...items]);
    } else if (preset === "weekend") {
      const confirmed = window.confirm(
        "Are you sure you want to replace the current list with the preset 'weekend getaway'?"
      );

      if (confirmed) {
        // Weekend trip array from presets.js
        setItems(presets[0]);
      }
    } else if (preset === "camping") {
      const confirmed = window.confirm(
        "Are you sure you want to replace the current list with the preset '4-night camping trip'?"
      );

      if (confirmed) {
        // Camping trip array from presets.js
        setItems(presets[1]);
      }
    }
  }

  return (
    <div className="app">
      <Logo />
      {/* We pass the handleAddItems function as a prop so we can use it in Form */}
      <Form onAddItems={handleAddItems} />
      {/* We pass the items state into <PackingList /> so it can be displayed */}
      <PackingList
        items={items}
        onGeneratePreset={handleGeneratePreset}
        onClearList={handleClearList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
