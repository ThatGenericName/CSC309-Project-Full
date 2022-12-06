import {Box, ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useContext, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


import {APIContext} from "../../APIContextProvider";
import {BASEURL} from "../../constants";
import axios from "axios";


export default function DropClassButton(props){
    const ctx = useContext(APIContext)

    const [dialogueState, setDialogueState] = useState({
        open: false,
        all: false,
    })

    const [axiosLoading, setAxiosLoading] = useState(false)

    function dropAllSessions(){
        setDialogueState({
            open: true,
            all: true
        })
    }

    function dropSession(){
        setDialogueState({
            open: true,
            all: false
        })
    }


    function handleClose(){
        setDialogueState({
            open: false,
            all: false
        })
    }

    let dialogueText

    if (dialogueState.all){
        dialogueText = "Are you sure you want to drop all sessions of this class?"
    }
    else{
        if (props.data['dropped']){
            if (props.data['financial_hold']){
                dialogueText = "You are currently under financial hold, please sign up for a membership before enrolling in classes"
            }
            else{
                dialogueText = "Are you sure you want to re-enroll in this session?"
            }
        }
        else{
            dialogueText = "Are you sure you want to drop this session?"
        }
    }

    function send(){
        setAxiosLoading(true)
        if (dialogueState.all){
            sendDropClass()
        }
        else{
            if (props.data['dropped']){
                sendReenrollClassSession()
            }
            else{
                sendDropClassSession()
            }
        }
    }

    function sendReenrollClassSession(){
        const token = ctx.userToken.replace("Token ")

        var targetURL = BASEURL + 'classes/session/' + props.sessionID + '/signup/'

        var requestData = {
            url: targetURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            }
        }

        axios(requestData)
            .then(function (response) {
                setAxiosLoading(false)
                // class has been dropped, now what?
                props.filterSetter({makeRequest: true})
                handleClose()
            })
            .catch(function (error) {
                // ya dun goof'd
                if (error.response.status = 403){
                    let a = 1
                }
                let a = 1
            })
    }

    function sendDropClassSession(){
        const token = ctx.userToken.replace("Token ")

        var targetURL = BASEURL + 'classes/session/' + props.sessionID + '/drop/'

        var requestData = {
            url: targetURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            }
        }

        axios(requestData)
            .then(function (response) {
                setAxiosLoading(false)
                // class has been dropped, now what?
                props.filterSetter({makeRequest: true})
                handleClose()
            })
            .catch(function (error) {
                // ya dun goof'd
                let a = 1
            })
    }

    function sendDropClass(){
        const token = ctx.userToken.replace("Token ")

        var targetURL = BASEURL + 'classes/' + props.classID + '/drop/'

        var requestData = {
            url: targetURL,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Token " + token
            }
        }

        axios(requestData)
            .then(function (response) {
                setAxiosLoading(false)
                // class has been dropped, now what?
                props.filterSetter({makeRequest: true})
                handleClose()
            })
            .catch(function (error) {
                // ya dun goof'd
            })
    }

    return (
        <Box>
            <ButtonGroup>
                <Button onClick={dropSession}>
                    {props.data['dropped'] ? "Re-enroll" : "Drop Session"}
                </Button>
                <Button onClick={dropAllSessions}>
                    Drop Class
                </Button>
            </ButtonGroup>
            <Dialog open={dialogueState.open} onClose={handleClose}>
                <Box sx={{p:3}}>
                    {dialogueText}
                </Box>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={send}
                        disabled={props.data['financial_hold'] && props.data['dropped']}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
