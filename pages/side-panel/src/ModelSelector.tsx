import { useState } from "react";

type ModelSelectorProps = {
  models: string[];
  onLoad: (model: string) => void;
};

export default function ModelSelector({ models, onLoad }: ModelSelectorProps) {
  const [selected, setSelected] = useState(models[0] || "");

  return (
    <div className="flex items-center gap-3">
      <select
        className="rounded-xl border p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ width: '100px' }}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        onClick={() => onLoad(selected)}
      >
        Load
      </button>
    </div>
  );
}
