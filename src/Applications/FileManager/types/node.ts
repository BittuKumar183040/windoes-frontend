export type FileFolder = "FILE" | "FOLDER"

export interface Node {
  "id": string,
  "userId": string,
  "parentId": string,
  "name": string,
  "type": FileFolder,
  "size": number,
  "status": string,
  "icon": string,
  "createdAt": number,
  "updatedAt": number,
}

export interface Path {
  id: string | null;
  label: string;
}