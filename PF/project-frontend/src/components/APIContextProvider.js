import {Component, createContext, useState} from "react";

export const APIContext = createContext();

export function useAPIContext(){

}

export function APIContextProvider(props){
    const [userData, setUserData] = useState({
        fullUserData: {},
        username: "",
        firstName: "",
        lastName: "",
        isStaff: false,
        imgSrc: ""
    })

    const [userLoggedIn, setUserLoggedIn] = useState(false)

    let ctx = {
        userData,
        setUserData,
        userLoggedIn,
        setUserLoggedIn
    }


    return (
        <APIContext.Provider value={ctx}>
            {props.children}
        </APIContext.Provider>
    )
}
