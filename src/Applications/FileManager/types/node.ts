export interface Node {
  "id": string,
  "type": "drive" | "folder" | "file",
  "label": string,
  "extension"?: string,
  "createdAt": number,
  "deleteStatus": 0 | 1 | -1,
  "readOnly": boolean,
  "size": number,
  "capacity"?: number,
  "parentId": string | null
}

export interface Path {
  id: string | null;
  label: string;
}