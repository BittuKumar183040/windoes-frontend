import React from "react";

interface ToggleBarProps {
  Logo: React.ComponentType<{ strokeWidth?: number }>;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleBar = ({
  Logo,
  label,
  checked,
  onChange,
}: ToggleBarProps) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition
        ${
          checked
            ? "border-blue-500 bg-blue-50/40"
            : "border-gray-300 bg-white/40 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-center gap-4 text-gray-800">
        <Logo strokeWidth={1.1} />
        <span className="text-sm">{label}</span>
      </div>

      <div
        className={`relative h-5 w-9 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
    </div>
  );
};
