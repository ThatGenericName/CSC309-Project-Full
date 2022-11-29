import React from 'react';
import InitElements from "../InitElements";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {
    Box,
    Divider,
    List,
    ListItem,
    styled,
    Typography
} from "@mui/material";
import DashboardMenuOpen from "./DashboardMenuOpen";
import {APIContext} from "../APIContextProvider";
import {BASEURL} from "../constants";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import MuiDrawer from "@mui/material/Drawer"


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));


export default class UserLanding extends React.Component{
    static contextType = APIContext
    constructor(props, context) {
        super(props, context);
        this.state = {
            menuOpened: false,
            reqSent: false,
            reqRec: false,
            tokenChecked: false,
            userData: null,
            drawerOpen: true
        }
    }

    componentDidMount(){
        if (this.context.userLoggedIn){
            // skip the below
        }
        else{
            let token = localStorage.getItem('Auth')

            if (token === null){
                this.setState({tokenChecked: true})
                return
            }
            let targetURL = BASEURL + 'accounts/view/'
            let tokenStr = 'Token ' + token.split(' ')[1]
            let requestData = {
                url: targetURL,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenStr
                }
            }

            let comp = this
            this.setState({reqSent: true})
            axios(requestData)
                .then(function (response){
                    comp.setState({userData: response.data, reqRec: true})
                })
                .catch(function (error){
                    comp.setState({userData: null, reqReq: true})
                })
        }
    }


    setMenuOpened(val){
        this.setState({menuOpened: val})
    }

    showUnauthorized(){
        return (
            <InitElements>
                <div>Please Log In</div>
            </InitElements>
        )
    }

    openDrawer(){

    }

    loggedInDisplay(){
        let p = {
            menuOpened: this.state.menuOpened,
            setMenuOpened: this.setMenuOpened
        }
        let userData = this.context.userData.fullUserData
        return (
            <Box sx={{ display: "flex" }}>
                <Drawer variant="permanent" open={true}>
                <Toolbar/>
                <Divider/>
                <DashboardMenuOpen userData={userData}/>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                    <Paper>
                        <Typography paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
                            dolor purus non enim praesent elementum facilisis leo vel. Risus at
                            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
                            quisque non tellus. Convallis convallis tellus id interdum velit
                            laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
                            adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
                            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
                            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
                            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
                            vivamus at augue. At augue eget arcu dictum varius duis at consectetur
                            lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
                            faucibus et molestie ac.
                        </Typography>
                    </Paper>
                </Box>
            </Box>
        )
    }

    render(){
        let display
        if (this.context.userLoggedIn && this.context.userData.fullUserData != null){
            display = this.loggedInDisplay()
        }
        else{
            display = this.showUnauthorized()
        }


        return (
            <Box sx={{ flexGrow: 1 }}>
                {display}
            </Box>
        )
    }
}
