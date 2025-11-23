/* eslint-disable prettier/prettier */
import React from "react";

export default function AttackList({ items }) {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 p-3 rounded-2xl shadow bg-white border"
            title={item.description}
          >
            <span className="text-base font-medium">🔴 {item.summary}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
