import React from "react";
import InitElements from "../InitElements";
import FormData from "form-data"
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Alert, AlertTitle, Typography} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import isEmail from "validator/lib/isEmail";
import * as Constants from "../constants";
import axios from "axios";
import {APIContext} from "../APIContextProvider";

const REQUIRED_PARAMS = ['name', 'address', 'post_code', 'phone_num']

export default class Studio extends React.Component{
    static contextType = APIContext
    constructor(props, context){
        super(props, context)
        this.state = {
            reqSent: false,
            reqSucc: false,
            reqResp: null,
            hasErrors: false,
            errors: {
                name: '',
                address: '',
                post_code: '',
                phone_num: '',
                images: ''
            },
            data: {
                name: '',
                address: '',
                post_code: '',
                phone_num: '',
                images:[]

            },
            generalMessage: "",
            axiosLoading: false

        }
    }

    setFormData(change){
        let dat = this.state.data
        for (let [key, value] of Object.entries(change)){
            dat[key] = value
        }
        var errors = {
                name: '',
                address: '',
                post_code: '',
                phone_num: '',
                images: ''
            }


        this.setState({data: dat, errors: errors})
    }
    setImage(change){
        let dat = this.state.data
        let a = change.target.files

        for(var img of change.target.files){
            dat['images'].push(img)
        }

        this.setState({data: dat})
    }

    ShowGeneralMessage(){
        if (this.state.reqSucc){
            return (
                <Alert severity="success">
                    <AlertTitle>Registration successful! Please log in</AlertTitle>
                </Alert>
            )
        }
        else{
            return (
                <Alert severity="error">
                    <AlertTitle>Please resolve errors</AlertTitle>
                </Alert>
            )
        }
    }

    ValidateData(){
        let data = this.state.data
        let errors = this.state.errors
        let hasErrors = false
        for (let [key, value] of Object.entries(data)){

            if (!(value.length) && REQUIRED_PARAMS.includes(key)){
                errors[key] = "This Field is required"
                hasErrors = true
            }
            else{
                errors[key] = ""
            }
        }

        if(!(errors.phone_num.length)){
            if(!(/^([0-9]{3})[-]([0-9]{3})[-]([0-9]{4})$/.test(data.phone_num))){
                errors['phone_num'] = 'Phone Number is Invalid'
                hasErrors = true
            }
        }

        if(!(errors.post_code.length)){
            if(!(/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/.test(data.post_code))){
                errors['post_code'] = 'Postal Code is Invalid'
                hasErrors = true
            }
        }

        this.setState({errors: errors, hasErrors: hasErrors})
        return hasErrors
    }

    OnSignupSubmit(){

        const formData = new FormData();

        this.setState({
            axiosLoading: true
        })
        let e = this.ValidateData()

        if (e){
            this.setState({
                axiosLoading: false
            })
        }
        else{
            let targetURL = Constants.BASEURL + 'studios/create/'
            let dat = this.state.data
            var formdat = new FormData()
            formdat.set("name", this.state.data.name)
            formdat.set("address", this.state.data.address)
            formdat.set("post_code", this.state.data.post_code)
            formdat.set("phone_num", this.state.data.phone_num)
            formdat.set("images", [])
            for(var img of this.state.data.images){
                formdat.append("images", img)
            }

            // var token = this.context.userToken
            // token = token.replace("Token ")

            let requestData = {
                url: targetURL,
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authentication': "Token " + token

                },
                data: formdat
            }

            var comp = this

            axios(requestData)
            .then(function (response){
                comp.setState({
                    axiosLoading: false
                })
                let newData = {
                    reqSent: true,
                    reqSucc: true,
                    reqResp: response.data
                }
                comp.setState(newData)

                comp.setState({
                    generalMessage: "Studio Added Successfully"
                })
            })
            .catch(function (error){
                comp.setState({
                    axiosLoading: false
                })
                let a = error.response.data

                let errors = comp.state.errors
                for (let [key, value] of Object.entries(a)){
                    errors[key] = value
                }

                let newData = {
                    reqSent: true,
                    reqSucc: false,
                    reqResp: a
                }
                comp.setState(newData)
            })


        }
    }
    render() {
        return (
            <div>
                <br/>
                <Typography variant="h3" align="center">Register Studio</Typography>
              <Box
                  noValidate
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      m: 'auto',
                      width: 'fit-content',
                  }}
              >
                  {this.state.reqSent && this.ShowGeneralMessage()}
                  <br/>
              </Box>
                <Box
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}
                >

                    <TextField
                        error={!!(this.state.errors.name.length)}
                        required
                        type='text'
                        id='name'
                        label='Name'
                        onChange={e => this.setFormData({name: e.target.value})}
                    />

                    <i style={{ color: 'red' }}>{this.state.errors.name}</i>
                    <br/>
                    <TextField
                        error={!!(this.state.errors.address.length)}
                        required
                        type='text'
                        id='address'
                        label='Address'
                        onChange={e => this.setFormData({address: e.target.value})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.address}</i>
                    <br/>

                    <TextField
                        error={!!(this.state.errors.post_code.length)}
                        // value={this.state.data.post_code}
                        required
                        type='text'
                        id='post_code'
                        label='Postal Code'
                        onChange={e => this.setFormData({post_code: e.target.value})}
                    />

                    <i style={{ color: 'red' }}>{this.state.errors.post_code}</i>
                    <br/>
                    <TextField
                        error={!!(this.state.errors.phone_num.length)}
                        // value={this.state.data.phone_num}
                        required
                        type='tel'
                        id='phone_num'
                        label='Phone Number'
                        onChange={e => this.setFormData({phone_num: e.target.value.toString()})}
                    />
                    <i style={{ color: 'red' }}>{this.state.errors.phone_num}</i>
                    <br/>

                    <div style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                        <input
                        multiple
                        type="file"
                        name="studio_images"
                        accept='image/png, image/jpeg'
                        id='images'
                        style={{ display: 'none' }}
                        onChange={e => {this.setImage(e)
                              let a = e.target.images
                          console.log("")
                          }}
                    />
                    <label htmlFor="images">
                        <Button variant="contained" color="primary" component="span">
                            Studio Images
                        </Button>
                    </label>
                    </div>

                    <br/>

                    <Button type="submit" variant='contained'
                            onClick={() => this.OnSignupSubmit()}>Submit</Button>

                    </Box>

            </div>
        )
    }
}
