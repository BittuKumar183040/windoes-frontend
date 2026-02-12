import type { Node } from "../../../Applications/FileManager/types/node";

export const findNodeById = (id: string | null, items: Node[] | null) => {
  if (!id || !items) return null;
  const node = items.find(item => item.id === id);
  if (!node) return null;
  return node;
};
