export default function AttackList({ items }) {
  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="bg-light-light card-shadow card-border text-light-darkest flex items-start gap-2 rounded-2xl p-3 shadow"
            title={item.description}>
            <span className="text-base font-medium">🔴 {item.summary}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
