import React, {Component, createContext, useState} from "react";
import * as Constants from "./constants";
import axios from "axios";
import isEqual from 'lodash.isequal';

export const APIContext = createContext();

export class APIContextProvider extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                fullUserData: {},
                username: "",
                firstName: "",
                lastName: "",
                isStaff: false,
                imgSrc: ""
            },
            userLoggedIn: false,
            appBarLoaded: false,
            userToken: null,
            updateData: null
        }

        this.checkLoginState(true)
    }

    setUserData = (obj) => {
        let dat = this.state.userData
        for (const [key, value] of Object.entries(obj)){
            dat[key] = value
        }
        this.setState({userData: obj})
    }

    setUserLoggedIn = (v) => {
        this.setState({userLoggedIn: v})
    }

    setAppBarLoaded = (v) => {
        this.setState({appBarLoaded: v})
    }

    setUserToken = (v) => {
        this.setState({userToken: v})
    }

    setUpdateDataFlag = () => {
        this.setState({updateDataFlag: true})
    }

    clearUserData(){
        let dat = {
            userData: {
                fullUserData: {},
                username: "",
                firstName: "",
                lastName: "",
                isStaff: false,
                imgSrc: ""
            },
            userLoggedIn: false,
            appBarLoaded: false,
            userToken: null
        }
        this.setState(dat)
    }

    checkLoginState(init, newToken){
        let token = (newToken === undefined || newToken === null) ? this.state.userToken : newToken
        if (token === null){
            token = localStorage.getItem('Auth')
        }

        if (token === null){
            //not logged in
            if (init){
                return null
            }
            else{
                this.clearUserData()
            }
        }
        else{
            let a = token.replace("Token ", "")
            this.checkAuth(a, init)
        }
    }


    checkAuth(token, init){

        let targetURL = Constants.BASEURL + 'accounts/view/'
        let tokenStr = 'Token ' + token
        let requestData = {
            url: targetURL,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenStr
            }
        }

        var comp = this

        axios(requestData)
        .then(function (response){
            let username = response.data['username']
            let imgSrc = response.data['profile_pic'] === null ? null : Constants.BASEURLNOEND + response.data['profile_pic']
            let firstName = response.data['first_name'] === null ? "" : response.data['first_name']
            let lastName = response.data['last_name'] === null ? "" : response.data['last_name']
            let isStaff = response.data['is_staff']
            let fd = {
                userData: {
                    imgSrc: imgSrc,
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    isStaff: isStaff,
                    fullUserData: response.data
                },
                userLoggedIn: true,
                appBarLoaded: true,
                userToken: token
            }
            if (init){
                comp.state = fd
                comp.setState(fd)
            }
            else{
                comp.setState(fd)
            }
        })
        .catch(function (error){
            comp.setState({
                userLoggedIn:false
            })
            localStorage.removeItem('Auth')
        })
    }

    checkStateChange(nextState){
        let a = isEqual(this.state, nextState)
        return !a
    }

    checkLoginStateChange(nextState){
        return (
            nextState.updateDataFlag
            || this.state.userLoggedIn !== nextState.userLoggedIn
            || this.state.userToken !== nextState.userToken
        )
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.checkLoginStateChange(nextState)){
            this.checkLoginState(false, nextState.userToken)
            this.setState({updateDataFlag: false})
        }
    }


    render(){
        let a = 1
        return (
            <APIContext.Provider
                value = {{
                    ...this.state,
                    setUserData: this.setUserData,
                    setUserLoggedIn: this.setUserLoggedIn,
                    setAppBarLoaded: this.setAppBarLoaded,
                    setUserToken: this.setUserToken,
                    updateDataFlag: this.setUpdateDataFlag
                    }}
            >
                {this.props.children}
            </APIContext.Provider>

        )
    }
}
