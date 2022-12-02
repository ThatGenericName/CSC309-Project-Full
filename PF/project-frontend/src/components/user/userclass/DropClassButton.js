import {Box, ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";


export default function DropClassButton(props){

    const [dialogueState, setDialogueState] = useState({
        open: false,
        all: false,
    })

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
        dialogueText = "Are you sure you want to drop this session?"
    }

    function send(){
        if (dialogueState.all){
            sendDropSession()
        }
        else{
            sendDropClass()
        }
    }

    function sendDropClass(){

    }

    function sendDropSession(){

    }

    return (
        <Box>
            <ButtonGroup>
                <Button onClick={dropSession}>
                    Drop Session
                </Button>
                <Button onClick={dropAllSessions}>
                    Drop Class
                </Button>
            </ButtonGroup>
            <Dialog open={dialogueState.open} onClose={handleClose}>
                {dialogueText}
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={send}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
