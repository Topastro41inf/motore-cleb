export function Button({ className = '', variant = 'default', children, ...props }) {
  const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium border';
  const style = variant === 'outline'
    ? 'bg-white text-slate-900 hover:bg-slate-100'
    : 'bg-slate-900 text-white hover:bg-slate-800';

  return (
    <button className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
}