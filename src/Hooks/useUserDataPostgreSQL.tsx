import {UserData} from "../interface";
import axios from "axios";

export const useUserDataPostgreSQL = () => {
  const port=3002;

  const getUserData = async ():Promise<UserData[]> => {
    const { data } = await axios.get(`http://localhost:${port}/getUserList`);
    return data;
  }

  const addUserData = async (userData:UserData):Promise<UserData> => {
    const { data } = await axios.post(`http://localhost:${port}/addUser`, userData);
    return data;
  }

  const updateUserData = async (userData:UserData):Promise<UserData> => {
    const { data } =  await axios.patch(`http://localhost:${port}/updateUser/${userData.id}`,userData);
    return data;
  }

  const deleteUserData = async (id:number):Promise<number> => {
    const { data } =  await axios.delete(`http://localhost:${port}/deleteUser/${id}`);
    return data;
  }

  return{getUserData,addUserData,updateUserData,deleteUserData};
}