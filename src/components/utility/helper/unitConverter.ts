export function formatBytes(bytes: number): string {
  if (bytes < 0) return '0 Bytes';
  const units = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0;
  let value = bytes;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${parseFloat(value.toFixed(2))} ${units[i]}`;
}