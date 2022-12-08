import React from 'react';
import InitElements from "../InitElements";
import {Box, Divider, styled} from "@mui/material";
import DashboardMenu from "./DashboardMenu";
import {APIContext} from "../APIContextProvider";
import {BASEURL} from "../constants";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import {Route, Routes, useLocation, useParams} from "react-router-dom";
import AccountDashboard from "./AccountDashboard";
import EditProfile from "./EditProfile";
import AccountClasses from "./userclass/AccountClasses";
import AccountSubscriptions from "./usersubscription/AccountSubscriptions";
import AccountPayment from "./userpayment/AccountPayment";
import {NotFound404} from "../ErrorPages/404NotFound";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} location={useLocation()}/>;
}

// large sections of the code below is taken from the documentation for
// MaterialUI Drawer component and then modified to fit the use case here
// https://mui.com/material-ui/react-drawer/

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


const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open"
})(({theme, open}) => ({
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

const tgtPage = {
    'edit': 1,
    'classes': 2,
    'subscriptions': 3,
    'payment': 4
}

class UserLoggedIn extends React.Component {
    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        this.state = {
            reqSent: false,
            reqRec: false,
            tokenChecked: false,
            userData: null,
            menuOpen: true,
        }
    }

    componentDidMount() {
        if (this.context.userLoggedIn) {
            // skip the below
        } else {
            let token = localStorage.getItem('Auth')

            if (token === null) {
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
                .then(function (response) {
                    comp.setState({userData: response.data, reqRec: true})
                })
                .catch(function (error) {
                    comp.setState({userData: null, reqReq: true})
                })
        }
    }


    setMenuOpened(val) {
        this.setState({menuOpen: val})
    }

    showUnauthorized() {
        return (
            <InitElements>
                <div>Please Log In</div>
            </InitElements>
        )
    }


    loggedInDisplay2() {
        let userData = this.context.userData.fullUserData
        return (
            <Box sx={{display: "flex"}}>
                <Drawer variant="permanent" open={this.state.menuOpen}>
                    <Toolbar/>
                    <IconButton onClick={() => this.setMenuOpened(!this.state.menuOpen)}>
                        {this.state.menuOpen ? <ChevronLeftIcon/> : <MenuIcon/>}
                    </IconButton>
                    <Divider/>
                    <DashboardMenu
                        userData={userData}
                        open={this.state.menuOpen}
                    />
                </Drawer>
                <Box component="main" sx={{flexGrow: 1, p: 2}}>
                    <Routes>
                        <Route path="" element={<AccountDashboard/>}/>
                        <Route path="edit" element={<EditProfile/>}/>
                        <Route path='classes' element={<AccountClasses/>}/>
                        <Route path='subscriptions' element={<AccountSubscriptions/>}/>
                        <Route path='payment' element={<AccountPayment/>}/>
                        <Route path='*' element={<NotFound404 suggestions={ACCOUNT404SUGGESTIONS}/>}/>
                    </Routes>
                </Box>
            </Box>
        )
    }

    render() {

        let display
        if (this.context.userLoggedIn && this.context.userData.fullUserData != null) {
            display = this.loggedInDisplay2()
        } else {
            display = this.showUnauthorized()
        }


        return (
            <Box sx={{flexGrow: 1}}>

                {display}
            </Box>
        )
    }
}

export default withParams(UserLoggedIn)


const ACCOUNT404SUGGESTIONS = [
    {
        name: "Account Dashboard",
        url: '/account/'
    },
    {
        name: "Edit Account",
        url: '/account/edit/'
    },
    {
        name: "Class Management",
        url: '/account/classes/'
    },
    {
        name: "Subscription Management",
        url: '/account/subscriptions/'
    },
    {
        name: "Payment Management",
        url: '/account/payment/'
    },
]
