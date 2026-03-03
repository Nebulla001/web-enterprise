"use client";

import { useState } from "react";

export default function CrudForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name) return;

    await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    onSuccess();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}