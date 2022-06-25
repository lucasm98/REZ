import {useEffect, useState} from "react";
import {UserData} from "../interface";
import axios from "axios";

interface ReturnProps {
  isLoggedIn:boolean,
  loggIn:(name:string,password:string) => boolean,
  loggOut:() => void,
  userList:UserData[],
  currentUser:UserData,
  toggleFavoriteByRecipeId:(id:number)=>boolean,
  updateUser:(user:UserData)=>void,
  deleteUser:(id:number)=>void
}

export default function useUser(): ReturnProps {
  const [userList,setUserList] = useState<UserData[]>([]);
  const [currentUser,setCurrentUser] = useState<UserData>({name:"",username:"",password:"",email:"",id:-1,favorites:[]});
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);

  const getNextFreeId = ():number => {
    let id=0;
    const usedIds:number[]=[];
    userList.forEach((user)=> {
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
      fetchData().then(()=>( setUserList(userData)) );
    }, []
  );

  const loggIn = (name:string,password:string):boolean => {
    let firstUserFound:boolean = false;
    userList.forEach((user:UserData)=> {
      if(user.username === name && user.password===password && !firstUserFound){
        firstUserFound = true;
        setIsLoggedIn(true);
        setCurrentUser(user);
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
    let favorites:number[] = currentUser.favorites;

    const isFav = isFavorite(id, favorites);

    favorites = isFav ? removeFavorite(id, favorites) : addFavorite(id, favorites)

    updateUser({
      ...currentUser,
      favorites
    })

    return !isFav;
  }

  const updateUser = async (data:UserData) => {

    console.log("updateUser",data);
    if(data.id === -1) {
      data.id = getNextFreeId();
      addUser(data)
        .then(newUser=> {
          setUserList( users => [...users,newUser]);
      })
    } else {
      correctUser(data)
        .then(existingUser => {
          if(currentUser.id !== 0)   setCurrentUser(existingUser);
          setUserList( users => [...users.filter((userData:UserData)=>(userData.id !== existingUser.id)),existingUser]);
        })
    }

    console.log("User Posted | ID: "+data.id+"| Name:"+data.username);
  }

  const correctUser = async (existingUser:UserData) => {
    console.log("correctUser",existingUser);
    await axios.patch(`http://localhost:3001/user/${existingUser.id}`,existingUser);
    return existingUser;
  }

  const addUser = async (newUser:UserData) => {
    console.log("addUser",newUser);
    await axios.post('http://localhost:3001/user', newUser);
    setUserList(users => [...users,newUser]);
    return newUser
  }

  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:3001/user/${id}`);
    setUserList(users => users.filter((user:UserData) => user.id !== id));
    setCurrentUser({name:"",username:"",password:"",email:"",id:-1,favorites:[]});
  }

  return {isLoggedIn,loggIn,loggOut,userList: userList,currentUser: currentUser,toggleFavoriteByRecipeId,updateUser,deleteUser};
}