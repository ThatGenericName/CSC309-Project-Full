import {Box, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, Route, Routes} from "react-router-dom";
import React, {useContext} from "react";
import {AdminMain} from "./AdminMain";
import {SubscriptionControlPanel} from "./Subscription/SubscriptionControlPanel";
import {UserControlPanel} from "./User/UserControlPanel";
import {StudiosLanding} from "../studios/StudioLanding";
import {APIContext} from "../APIContextProvider";
import {Unauthorized401} from "../ErrorPages/401Unauthorized";
import {NotFound404} from "../ErrorPages/404NotFound";

export function AdminLandingPage() {

    const ctx = useContext(APIContext)

    if (!ctx.userLoggedIn || !ctx.userData.isStaff) {
        return (<Unauthorized401/>)
    }

    return (
        <Stack sx={{p: 2}}>
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant='h3'>
                    Admin Control Panel
                </Typography>
            </Box>
            <Box
                sx={{p: 3}}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button component={Link} to={'/admin/studio'}>
                    Studio Management
                </Button>
                <Button component={Link} to={'/admin/subscription'}>
                    Membership Management
                </Button>
                <Button component={Link} to={'/admin/users'}>
                    User Management
                </Button>
            </Box>
            <Routes>
                <Route path="" element={<AdminMain/>}/>
                <Route path="/subscription" element={<SubscriptionControlPanel/>}/>
                <Route path='/users' element={<UserControlPanel/>}/>
                <Route path='/studio/*' element={<StudiosLanding admin={true}/>}/>
                <Route path='/*' element={<NotFound404 suggestions={ADMIN404SUGGESTIONS}/>}/>
            </Routes>
        </Stack>
    )
}


const ADMIN404SUGGESTIONS = [
    {
        name: "Admin Panel Homepage",
        url: '/admin/'
    },
    {
        name: "Studio Management",
        url: '/admin/studio/'
    },
    {
        name: "Membership Management",
        url: '/admin/subscription/'
    },
    {
        name: "User Management",
        url: '/admin/users/'
    },
]
