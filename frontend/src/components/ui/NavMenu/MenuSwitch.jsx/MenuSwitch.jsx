import { Switch } from "@nextui-org/react";

export function MenuSwitch({ selected, setSelected }) {
  return (
    <div className="flex gap-4">
      <Switch
        defaultSelected
        size="sm"
        isSelected={selected}
        onChange={() => setSelected(!selected)}
      >
        Advance Search
      </Switch>
    </div>
  );
}
