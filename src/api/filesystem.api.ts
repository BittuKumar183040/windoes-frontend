import backendAPI from "../components/utility/helper/apiRequestService";
import { API_ENDPOINTS } from "./endpoints";

export const overview = async () => {
  const { data } = await backendAPI.get(API_ENDPOINTS.FILESYSTEM.OVERVIEW());
  return data;
};

export const folder = async (id: string | null) => {
  const { data } = await backendAPI.get(API_ENDPOINTS.FILESYSTEM.BY_FOLDER(id));
  return data;
};

export const renameFolder = async (id: string, value: string) => {
  const { data } = await backendAPI.put(
    API_ENDPOINTS.FILESYSTEM.RENAME_BY_ID(id), { newName: value }
  );
  return data;
};

export const deleteFolder = async (id: string) => {
  console.log("Delete API")
  const { data } = await backendAPI.delete(API_ENDPOINTS.FILESYSTEM.BY_ID(id));
  return data;
};

export const createFolder = async (parentId: string | null, name: string) => {
  const { data } = await backendAPI.post(API_ENDPOINTS.FILESYSTEM.FOLDER(), {
    parentId,
    name,
  });

  return data;
};

export const createFile = async (parentId: string | null, name: string, size?: number) => {
  const { data } = await backendAPI.post(API_ENDPOINTS.FILESYSTEM.FILE(), {
    parentId,
    name,
    size: size || 0,
  });

  return data;
};
