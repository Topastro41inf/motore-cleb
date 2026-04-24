export function Card({ className = '', children }) {
  return <div className={`border bg-white ${className}`}>{children}</div>;
}

export function CardHeader({ className = '', children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardTitle({ className = '', children }) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ className = '', children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}