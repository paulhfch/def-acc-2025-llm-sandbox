import { useState } from 'react';

export default function CheckboxList({ items = [], onChange }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggle = item => {
    const exists = selectedIds.includes(item.id);
    const updated = exists ? selectedIds.filter(id => id !== item.id) : [...selectedIds, item.id];

    setSelectedIds(updated);

    // return the full selected objects
    const selectedItems = items.filter(i => updated.includes(i.id));
    if (onChange) {
      onChange(selectedItems);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-light-base card-shadow card-border flex max-h-64 min-h-[100px] items-center justify-center space-y-2 overflow-y-auto rounded-xl p-2">
        <p className="text-light-darkest">No Active Tabs</p>
      </div>
    );
  }

  return (
    <div className="bg-light-base card-shadow card-border max-h-64 space-y-2 overflow-y-auto rounded-xl p-2">
      {items.map(item => (
        <label
          key={item.id}
          className={`text-light-darkest flex cursor-pointer items-center gap-2 rounded-xl p-2 ${
            selectedIds.includes(item.id) ? 'bg-[#D4D0B8]' : 'hover:bg-gray-100'
          }`}>
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={() => toggle(item)}
            className="checkbox-shadow rounded"
          />
          <span>{item.title}</span>
        </label>
      ))}
    </div>
  );
}
