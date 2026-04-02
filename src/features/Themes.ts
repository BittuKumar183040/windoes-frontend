export interface TypeTheme {
  label: string;
  theme: "dark" | "light";
  value: string;
  preview: string; 
  style: React.CSSProperties;
}

const tc = (from: string, to: string, alpha = "0.95"): TypeTheme["style"] => ({
  background: `linear-gradient(to right, ${from}${alphaToHex(alpha)}, ${to}${alphaToHex(alpha)})`,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
});

const alphaToHex = (alpha: string) =>
  Math.round(parseFloat(alpha) * 255).toString(16).padStart(2, "0").toUpperCase();

export const TITLE_COLOR_PRESETS: TypeTheme[] = [
  {
    label: "Silver Mist",
    theme: "light",
    value: "text-black",
    preview: "linear-gradient(to right, #d0dde6, #e8e8e8)",
    style: tc("#d0dde6", "#e8e8e8", "0.80"),
  },
  {
    label: "Obsidian",
    theme: "dark",
    value: "text-white",
    preview: "linear-gradient(to right, #0a0a0a, #1c1c1c)",
    style: tc("#0a0a0a", "#1c1c1c", "0.95"),
  },
  {
    label: "Ash",
    theme: "dark",
    value: "text-white",
    preview: "linear-gradient(to right, #2a2a2a, #4a4a4a)",
    style: tc("#2a2a2a", "#4a4a4a", "0.95"),
  },
  {
    label: "Graphite",
    theme: "dark",
    value: "text-white",
    preview: "linear-gradient(to right, #1a1a1a, #3d3d3d)",
    style: tc("#1a1a1a", "#3d3d3d", "0.95"),
  },
];