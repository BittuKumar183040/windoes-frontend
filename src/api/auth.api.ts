import backendAPI from '../components/utility/helper/apiRequestService';
import { API_ENDPOINTS } from './endpoints';

interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const { data } = await backendAPI.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  return data;
};
