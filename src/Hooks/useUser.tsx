import React, {useEffect, useState} from "react";
import {UserData} from "../interface";
import axios from "axios";

export default function useUser():[boolean,(name:string,password:string) => boolean, () => void,UserData[],UserData,any] {
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

  return [isLoggedIn,loggIn,loggOut,users,user,setUser];
}