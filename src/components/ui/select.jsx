import * as SelectPrimitive from '@radix-ui/react-select';

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({ className = '', children }) {
  return (
    <SelectPrimitive.Trigger className={`w-full rounded-xl border px-3 py-2 text-sm ${className}`}>
      {children}
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ className = '', children }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={`z-50 rounded-xl border bg-white p-1 shadow ${className}`}>
        <SelectPrimitive.Viewport>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ value, className = '', children }) {
  return (
    <SelectPrimitive.Item
      value={value}
      className={`cursor-pointer rounded-lg px-3 py-2 text-sm hover:bg-slate-100 ${className}`}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}