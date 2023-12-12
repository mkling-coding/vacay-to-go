import { useState } from "react";

export default function Form({ onAddItems }) {
  // Elements such as input and select maintain their own state inside the DOM. This makes it hard to read their values and by default, their state is kept in the DOM. In React, we like to keep the state inside the React application and not inside the DOM. To do that, we use a technique called controlled elements which has 3 steps.

  // Step 1: Create a piece of state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // The page automatically reloads on a submit event so we prevent that with preventDefault because we don't want our page refreshing every time a new item is added
    e.preventDefault();

    // If input box is empty, don't create a new item
    if (!description) return;

    // Adds new item using description and quantity states
    const newItem = { description, quantity, packed: false, id: Date.now() };

    // Adds newItem to items state
    onAddItems(newItem);

    // Resets select and input elements to default states
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        // Changes quantity whenever new number is selected in the menu
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* Step 2: Use the state as a value of the input field (value = {description}) */}
      {/* Step 3: Listen for the change event (onChange) */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
