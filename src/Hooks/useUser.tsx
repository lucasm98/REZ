import React, {useEffect, useState} from "react";
import {UserData} from "../interface";
import axios from "axios";

export default function useUser():[boolean,UserData[],UserData,(name:string,password:string) => boolean, () => void] {
  const [user,setUser] = useState<UserData[]>([]);
  const [account,setAccount] = useState<UserData>({name:"",username:"",password:"",email:""});
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);


  useEffect(() => {
      let userData:any = null;
      const fetchData = async () => {
        const { data } = await axios.get('http://localhost:3001/user');
        userData = data;
      };
      fetchData().then(()=>( setUser(userData)) );
    }, []
  );

  const loggIn = (name:string,password:string):boolean => {
    let onlyOneUser:boolean = false;
    user.forEach((user:UserData, index:number)=> {
      if(user.username === name && user.password===password && !onlyOneUser){
        onlyOneUser = true;
        setIsLoggedIn(true);
        setAccount(user);
      }
    });
    console.log(onlyOneUser?"Login succeeded":"Login failed");
    return onlyOneUser;
  }

  const loggOut = ():void => {
    setIsLoggedIn(false);
  }

  return [isLoggedIn,user,account,loggIn,loggOut];
}