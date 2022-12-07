import {APIContext} from "../APIContextProvider";
import {useContext} from "react";
import UserLoggedIn from "./UserLoggedIn";
import {UserNotLoggedIn} from "./NotLoggedIn/UserNotLoggedIn";


export function UserLanding(props){
    const ctx = useContext(APIContext)

    if (ctx.userLoggedIn){
        return (
            <UserLoggedIn/>
        )
    }
    else {
        return (
            <UserNotLoggedIn/>
        )
    }
}
