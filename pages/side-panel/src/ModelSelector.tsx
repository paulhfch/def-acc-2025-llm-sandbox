import { useState } from 'react';

type ModelSelectorProps = {
  models: string[];
  onLoad: (model: string) => void;
};

export default function ModelSelector({ models, onLoad }: ModelSelectorProps) {
  const [selected, setSelected] = useState(models[0] || '');

  return (
    <div className="flex items-center gap-3">
      <select
        className="text-light-darkest card-shadow card-border w-full rounded-xl bg-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selected}
        onChange={e => setSelected(e.target.value)}>
        {models.map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        className="text-light-darkest load-button-shadow rounded-xl border border-[#948872] bg-[#A99B81] px-4 py-2 transition-colors hover:bg-[#958877] active:bg-[#857A6A] disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onLoad(selected)}>
        Load
      </button>
    </div>
  );
}
