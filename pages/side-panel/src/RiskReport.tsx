import { useState } from 'react';

type RiskItem = {
  attack_type: string;
  summary: string;
  description: string;
};

type RiskReportProps = {
  items: RiskItem[];
};

export default function RiskReport({ items }: RiskReportProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  if (!items || items.length === 0) {
    return (
      <div className="mb-6">
        <div className="card-shadow card-border rounded-xl bg-white p-4">
          <h1 className="text-light-darkest text-center text-3xl font-bold">SAFE</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="card-shadow card-border mb-4 rounded-xl bg-white p-4">
        <h1 className="text-red text-center text-3xl font-bold">WARNING</h1>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="card-border risk-accordion-shadow overflow-hidden rounded-xl bg-[#F7F4EE]">
            <button
              onClick={() => toggleItem(idx)}
              className="flex w-full items-center justify-between p-3 text-left transition-opacity hover:opacity-90">
              <div className="flex items-center gap-3">
                <div className="bg-red risk-x-icon-bg flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-light-darkest font-medium">{item.summary}</span>
              </div>
              <svg
                className={`text-light-darkest h-5 w-5 transition-transform ${expandedItems.has(idx) ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedItems.has(idx) && (
              <div className="px-3 pb-3 pt-0">
                <div className="text-light-darkest border-t border-[#726A5A] pt-3">{item.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
