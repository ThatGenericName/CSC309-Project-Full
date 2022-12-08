import {useContext, useState} from "react";
import {APIContext} from "../../APIContextProvider";
import Button from "@mui/material/Button";
import {DeepCloneStateSet} from "../../Utility";
import {Box, Dialog, DialogActions, DialogTitle, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {BASEURL} from "../../constants";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export function EnrollUserInClassButton(props) {
    const ctx = useContext(APIContext)
    const navigate = useNavigate()

    const [compState, setComp] = useState({
        dialogOpen: false,
        axiosLoading: false
    })

    const [dialogOpen, setDialogOpen] = useState(false)

    function setCompState(obj) {
        DeepCloneStateSet(compState, obj, setComp)
    }

    if (ctx.userLoggedIn === false || ctx.userData.fullUserData['active_subscription'] === null) {
        return null // user won't have perms
    }

    function onClick() {
        setCompState({
            dialogOpen: true,
            axiosLoading: true
        })
        setDialogOpen(true)

        const targetURL = BASEURL + "classes/" + props.classID + "/signup/"

        var token = "Token " + ctx.userToken.replace("Token ", "")

        const reqData = {
            url: targetURL,
            method: "GET",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token
            }
        }

        axios(reqData).then(function (response) {
            setCompState({
                axiosLoading: false
            })
        }).catch(function (error) {
            if (error.response.status >= 500) {
                return navigate('/error/500')
            }
        })
    }

    function onClose() {
        setDialogOpen(false)
    }

    return (
        <>
            <Button
                variant='contained'
                onClick={onClick}
            >
                Enroll In Class
            </Button>
            <Dialog
                open={dialogOpen}
                onClose={onClose}
            >
                <DialogTitle>
                    Enroll in {props.className}
                </DialogTitle>
                <Box
                    sx={{
                        p: 2
                    }}
                    style={{
                        textAlign: 'center'
                    }}
                >
                    {compState.axiosLoading && <CircularProgress/>}
                    {!compState.axiosLoading &&
                        <Typography>
                            Success, you can manage your classes in your account page
                        </Typography>
                    }
                </Box>
                <DialogActions>
                    <Button
                        variant='outlined'
                        onClick={onClose}
                    >
                        Go Back
                    </Button>
                    <Button
                        variant='contained'
                        disabled={compState.axiosLoading}
                        component={Link}
                        to='/account/classes'
                    >
                        Go To Account
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )


}
