import React from 'react';
import * as Constants from '../constants';
import axios from 'axios';
import Button from '@mui/material/Button';


class TestClass extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: {},
        }
    }

    SignUpHandler(){
        let data = {
            username: 'bstills33',
            password1: 'Password1',
            password2: 'Password1',
            first_name: "Bteven",
            last_name: "Stills",
            email: 'testemail@outlook.com',
            phone_num: '123-456-7890'
        }
    
        let targetURL = Constants.BASEURL + 'accounts/register/'
        

        let requestData = {
            url: targetURL,
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        
        var comp = this

        axios(requestData)
            .then(function (response){
                let newData = {
                    reqSent: true,
                    reqSucc: true,
                    reqResp: response.data
                }
                console.log(response.status)
                comp.setState(newData)
            })
            .catch(function (error){
                let a = error.response.data
                let newData = {
                    reqSent: true,
                    reqSucc: false,
                    reqResp: a
                }
                console.log('test')
                comp.setState(newData)
            })
    }
    
    IfContent(){
        if (!this.state.reqSent){
            return (<div></div>)
        }
        else{
            if (this.state.reqSucc){
                return (<div>
                    <p>Success</p>
                </div>)
            }
            else{
                return (
                    <div>
                        <p>Failed</p>
                    </div>
                )
            }
        }
    }

    render(){
        let a = this.IfContent()
        return (
            <div>
                <p>Test Content</p>
                <Button variant='contained' onClick={button => this.SignUpHandler(button)}>Sign Up</Button>
                {a}
            </div>
        );
    }
}



export default TestClass;