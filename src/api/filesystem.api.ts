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