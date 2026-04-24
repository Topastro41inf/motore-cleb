export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-xl border px-3 py-2 text-sm outline-none ${className}`}
      {...props}
    />
  );
}