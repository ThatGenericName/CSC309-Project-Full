import {useState} from "react";
import axios from "axios";

export const BASEURL = "http://127.0.0.1:8000/"
export const BASEURLNOEND = "http://127.0.0.1:8000"

export let UserData = null

export function SetUserData(data){
    UserData = data
}
