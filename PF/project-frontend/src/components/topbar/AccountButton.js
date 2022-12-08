import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {APIContext} from "../APIContextProvider";
import {Divider} from "@mui/material";
import LogoutButton from "./LogoutButton";


export default class AccountButton extends React.Component{
    static contextType = APIContext
        constructor(props, context){
        super(props, context)

        let userData = this.context.userData
        let displayName
        if (userData.firstName === "" && userData.lastName === ""){
            displayName = userData.username
        }
        else {
            displayName = userData.firstName + " " + userData.lastName
        }

        let icon
        if (userData.imgSrc === null || userData.imgSrc === "") {
            icon = <AccountCircleIcon/>
        }
        else{
            icon = <Avatar alt={displayName} src={userData.imgSrc}/>
        }

        this.state = {
            anchorEl: null,
            displayName: displayName,
            displayIcon: icon
        }
    }

    setAnchorEl = (e) => {
        this.setState({anchorEl: e})
    }

    handleClose = () => {
        this.setAnchorEl(null);
    }

    handleClick = (event) => {
        this.setAnchorEl(event.currentTarget);
    }

    open = () => {
        return Boolean(this.state.anchorEl)
    }

    InitialMenuItem(){
        return (
            <MenuItem>
                {this.state.displayIcon} {"  "}Hello {this.state.displayName}
            </MenuItem>
        )
    }


    render(){
        return (
            <div>
                <IconButton sx={{ p: 0 }}
                    aria-controls={this.open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={this.open ? 'true' : undefined}
                    onClick={(e) => this.handleClick(e)}
                >
                    {this.state.displayIcon}
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.open()}
                    onClose={() => this.handleClose()}
                    MenuListProps={{
                        'aria-labelledby': 'guest-button',
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    style={{
                        zIndex: 1401
                    }}
                >
                    {this.InitialMenuItem()}
                    <Divider />
                    <MenuItem
                        component='a'
                        href='/account'
                    >
                        My Account
                    </MenuItem>

                    <LogoutButton/>
                    {this.context.userData.isStaff && <Divider/>}
                    {this.context.userData.isStaff &&
                        <MenuItem
                            component='a'
                            href='/admin'
                        >
                            Admin Panel
                        </MenuItem>
                    }
                </Menu>
            </div>
        );
    }
}
