import { API_ENDPOINTS } from './endpoints';
import type { User } from '../types/User';
import backendAPI from '../components/utility/helper/apiRequestService';

export const getUserByKeyword = async (keyword: string): Promise<User> => {
  const { data } = await backendAPI.get(
    API_ENDPOINTS.USERS.BY_KEYWORD(keyword)
  );
  return data;
};
