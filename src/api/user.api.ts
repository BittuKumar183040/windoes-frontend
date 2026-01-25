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
  console.log("Getting Image from id:", id , " with Key: ", cacheKey);
  const cachedBlob = await getImage(cacheKey);
  console.log("Retrived image from Db : ", cachedBlob)
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

export const uploadProfileImage = async (id: string, file: File): Promise<string> => {
  const cacheKey = `profile-${id}`;
  
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileTag", "profile-picture");

  const response = await backendAPI.post(
    API_ENDPOINTS.IMAGE.UPLOAD(id),
    formData,
    {
      headers: { Accept: "application/json" },
      responseType: "blob",
    }
  );
  const blob = new Blob([file], { type: file.type });
  console.log("Insering", cacheKey, "into - db ", blob);
  await storeImage(cacheKey, blob);
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