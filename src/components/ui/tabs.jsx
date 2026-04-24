import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className = '', children }) {
  return (
    <TabsPrimitive.List className={className}>
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ value, className = '', children }) {
  return (
    <TabsPrimitive.Trigger value={value} className={className}>
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({ value, className = '', children }) {
  return (
    <TabsPrimitive.Content value={value} className={className}>
      {children}
    </TabsPrimitive.Content>
  );
}