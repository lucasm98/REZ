import React, {useEffect, useState} from "react";
import {RecipeData, UserData} from "../interface";
import axios from "axios";

export default function useUser():
  [
    boolean,
    (name:string,password:string) => boolean,
    () => void,
    UserData[],
    UserData,
    (data:string,value:string)=>void
  ] {
  const [users,setUsers] = useState<UserData[]>([]);
  const [user,setUser] = useState<UserData>({name:"",username:"",password:"",email:"",id:-1,favorites:[]});
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);


  useEffect(() => {
      let userData:any = null;
      const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/user');
        userData = data;
      };
      fetchData().then(()=>( setUsers(userData)) );
    }, []
  );

  const loggIn = (name:string,password:string):boolean => {
    let firstUserFound:boolean = false;
    users.forEach((user:UserData, index:number)=> {
      if(user.username === name && user.password===password && !firstUserFound){
        firstUserFound = true;
        setIsLoggedIn(true);
        setUser(user);
      }
    });
    console.log(firstUserFound?"Login succeeded":"Login failed");
    return firstUserFound;
  }

  const loggOut = ():void => {
    console.log("logged out");
    setIsLoggedIn(false);
  }

  const setUserData = (data:string,value:string):void => {
    switch (data) {
      case "toggleFavorite":
        const favID = parseInt(value);
        let newUser:UserData = user;
        if( newUser.favorites.includes(favID)){
          newUser.favorites = newUser.favorites.filter((fav:number)=>( fav !== favID ));
        } else {
          newUser.favorites = [...newUser.favorites,favID];
        }
        setUser(newUser);
        updateUser(newUser);
        break;
      default:
        console.log("Default | setUserData: "+data+" with Value: "+value);
        break;
    }
  }

  const updateUser = async (user:UserData) => {
    await axios.patch(`http://localhost:3001/user/${user.id}`,user);
  }

  return [isLoggedIn,loggIn,loggOut,users,user,setUserData];
}