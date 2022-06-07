import React, {useEffect, useState} from "react";
import {UserData} from "../interface";
import axios from "axios";

export default function useUser():
  [
    boolean,
    (name:string,password:string) => boolean,
    () => void,
    UserData[],
    UserData,
    (id:number)=>boolean,
    (user:UserData)=>void
  ] {
  const [users,setUsers] = useState<UserData[]>([]);
  const [user,setUser] = useState<UserData>({name:"",username:"",password:"",email:"",id:-1,favorites:[]});
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  const getNextFreeId = ():number => {
    let id=0;
    const usedIds:number[]=[];
    users.forEach((user,index:number)=> {
      usedIds.push(user.id!);
    });
    while(usedIds.includes(id)){
      id++;
    }
    return id;
  }

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

  const removeFavorite = (id:number,favorites:number[]) =>  favorites.filter((fav:number)=>( fav !== id ));
  const addFavorite = (id:number,favorites:number[]) => [id, ...favorites];
  const isFavorite = (id:number,favorites:number[]):boolean => favorites.includes(id);

  const toggleFavoriteByRecipeId = (id:number):boolean => {
    let favorites:number[] = user.favorites;

    const isFav = isFavorite(id, favorites);

    favorites = isFav ? removeFavorite(id, favorites) : addFavorite(id, favorites)

    updateUser({
      ...user,
      favorites
    }).then(user => {
      setUser(user);
    })

    return !isFav;
  }

  const updateUser = async (user:UserData) => {
    await axios.patch(`http://localhost:3001/user/${user.id}`,user);
    return user;
  }

  const addUser = async (data:UserData) => {

    if(data.id===-1) data.id = getNextFreeId();

    await axios.post('http://localhost:3001/user', data,{
      headers: {
        'content-type': 'application/json',
      }
    })
    setUsers(users => [...users,data]);

    console.log("User Posted | ID: "+data.id+"| Name:"+data.username);
  }

  return [isLoggedIn,loggIn,loggOut,users,user,toggleFavoriteByRecipeId,addUser];
}