import { API_ENDPOINTS } from './endpoints';
import type { User, UserRegistrationPayload } from '../types/User';
import backendAPI from '../components/utility/helper/apiRequestService';
import { getImage, storeImage } from '../components/utility/helper/indexDbHelper';

export const getUserByKeyword = async (keyword: string): Promise<User> => {
  const { data } = await backendAPI.get(
    API_ENDPOINTS.USERS.BY_KEYWORD(keyword)
  );
  return data;
};

export const getUserProfileImage = async (id: string): Promise<string> => {
  const cacheKey = `profile-${id}`;

  const cachedBlob = await getImage(cacheKey);
  if (cachedBlob) {
    console.log(`User:${cacheKey} , Profile Image retrived from cached db`);
    return URL.createObjectURL(cachedBlob);
  }

  const response = await backendAPI.get(
    API_ENDPOINTS.IMAGE.BY_FILETAG(id, 'profile-picture', 'ACTIVE'),
    { responseType: 'blob' }
  );

  await storeImage(cacheKey, response.data);
  return URL.createObjectURL(response.data);
};

export const registerUser = async (payload: UserRegistrationPayload) : Promise<User> => {
  const { data } = await backendAPI.post(API_ENDPOINTS.USERS.REGISTER(), payload)
  localStorage.setItem("user", JSON.stringify(data))
  return data;
}

export const checkUserExistance = async (username: string): Promise<boolean> => {

  const { data } = await backendAPI.get(
    API_ENDPOINTS.USERS.BY_USERNAME(username)
  );

  return data.available;
}