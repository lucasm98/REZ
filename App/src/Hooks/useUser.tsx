import {useEffect, useState} from "react";
import {ShoppingListEntry, UserData} from "../interface";
import {useUserDataJson} from "./useUserDataJson";

interface ReturnProps {
  isLoggedIn:boolean,
  loggIn:(name:string,password:string) => boolean,
  loggOut:() => void,
  getUserList:()=>UserData[],
  getCurrentUser:()=>UserData,
  toggleFavoriteByRecipeId:(id:number)=>boolean,
  updateUser:(user:UserData)=>void,
  deleteUser:(id:number)=>void,
  addRecipeToShoppingList:(shoppingListEntry:ShoppingListEntry)=>void
}

export const emptyUser:UserData = {
  name:"",
  username:"",
  password:"",
  email:"",
  id:-1,
  admin:false,
  favorites:[],
  shoppingList:[]
}

export default function useUser(): ReturnProps {
  const [userList,setUserList] = useState<UserData[]>([]);
  const [currentUser,setCurrentUser] = useState<UserData>(emptyUser);
  const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false);
  const {getUserData,addUserData,updateUserData,deleteUserData} = useUserDataJson();

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
      getUserData()
        .then((userData:UserData[])=>{
          setUserList(userData)
        })
        .catch((error)=>{
          console.log("ERROR getUserData",error);
        })
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

  const addRecipeToShoppingList = (shoppingListEntry:ShoppingListEntry):void => {
    let newShoppingList:ShoppingListEntry[] = currentUser.shoppingList;
    let includesRecipe:boolean = false;
    newShoppingList.forEach((listEntry:ShoppingListEntry,index:number)=>{
      if(listEntry.recipe === shoppingListEntry.recipe) {
        newShoppingList[index].amount += shoppingListEntry.amount;
        includesRecipe = true;
      }
    });
    if(includesRecipe) console.log("Updated Recipe",shoppingListEntry.recipe,"for +",shoppingListEntry.amount,"Persons to shoppinglist");
    else {
        newShoppingList.push(shoppingListEntry);
        console.log("Added Recipe",shoppingListEntry.recipe,"for",shoppingListEntry.amount,"Persons to shoppinglist");
    }
    updateUser({
      ...currentUser,
      shoppingList:newShoppingList
    })
  }

  const updateUser = async (data:UserData) => {
    console.log("updateUser",data);
    if(data.id === -1) {
      data.id = getNextFreeId();
      addUserData(data)
        .then((newUser:UserData)=> {
          setUserList( users => [...users,newUser]);
          console.log("User Posted | ID: "+newUser.id+"| Name:"+newUser.username);
        })
        .catch((error)=>{
          console.log("ERROR addUserData",error);
        })
    } else {
      updateUserData(data)
        .then((existingUser:UserData)=> {
          if(!currentUser.admin)   setCurrentUser(existingUser);
          setUserList( users => [...users.filter((userData:UserData)=>(userData.id !== existingUser.id)),existingUser]);
          console.log("User Updated | ID: "+existingUser.id+"| Name:"+existingUser.username);
        })
        .catch((error)=>{
          console.log("ERROR updateUserData",error);
        })
    }
  }

  const deleteUser = async (id: number) => {
    deleteUserData(id)
      .then((id:number)=>{
        setUserList(users => users.filter((user:UserData) => user.id !== id));
        if(currentUser.id === id)setCurrentUser(emptyUser);
        console.log("User Delete | ID: "+id);
      })
      .catch((error)=>{
        console.log("ERROR deleteUserData",error);
      })
  }

  const getUserList = ():UserData[] => (userList)
  const getCurrentUser = ():UserData => (currentUser)

  return {isLoggedIn,loggIn,loggOut,getUserList,getCurrentUser,toggleFavoriteByRecipeId,updateUser,deleteUser,addRecipeToShoppingList};
}