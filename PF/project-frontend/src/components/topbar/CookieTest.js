import React from 'react';
import Cookies from 'universal-cookie';
import * as Constants from '../constants';
import axios from 'axios';

import Button from '@mui/material/Button';

const REQUIRED_PARAMS = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email']


const cookies = new Cookies()

export default class SignUpButton extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: null,
            openDiag: false,
            hasErrors: false,
        }
    }

    OnClick(){

        cookies.set('CSC309CookieTest', 'CookieTestValue', { path: '/ReactJSFrontend' })
        let b = localStorage.getItem('Auth')
        let a = cookies.get('NonExistentCookie')
        console.log(a)
    }

    render(){
        return (
            <div>
            <Button variant='contained' onClick={() => this.OnClick()}>Generate Cookie</Button>
        </div>
        )
    }
}
