import {UserData, UseUserData} from "../interface";
import axios from "axios";

export const useUserDataJson = (): UseUserData => {
  const getUserData = async ():Promise<UserData[]> => {
    const { data } = await axios.get('http://localhost:3001/user');
    return data;
  }

  const addUserData = async (userData:UserData):Promise<UserData> => {
    const { data } = await axios.post('http://localhost:3001/user', userData);
    return data;
  }

  const updateUserData = async (userData:UserData):Promise<UserData> => {
    const { data } =  await axios.patch(`http://localhost:3001/user/${userData.id}`,userData);
    return data;
  }

  const deleteUserData = async (id:number):Promise<number> => {
    const { data } =  await axios.delete(`http://localhost:3001/user/${id}`);
    return data;
  }

  return{getUserData,addUserData,updateUserData,deleteUserData};
}