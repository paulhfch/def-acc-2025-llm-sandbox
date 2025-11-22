/* eslint-disable prettier/prettier */
import { useState } from 'react';

export default function CheckboxList({ items = [], onChange }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggle = (item) => {
    const exists = selectedIds.includes(item.id);
    const updated = exists
      ? selectedIds.filter(id => id !== item.id)
      : [...selectedIds, item.id];

    setSelectedIds(updated);

    // return the full selected objects
    const selectedItems = items.filter(i => updated.includes(i.id));
    onChange && onChange(selectedItems);
  };

  return (
    <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border p-2">
      {items.map(item => (
        <label
          key={item.id}
          className="flex cursor-pointer items-center gap-2 rounded-xl p-2 hover:bg-gray-100"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => toggle(item)}
          />
          <span>{item.title}</span>
        </label>
      ))}
    </div>
  );
}