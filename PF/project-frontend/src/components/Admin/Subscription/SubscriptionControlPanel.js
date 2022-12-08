import {Box, Button, Paper, Stack} from "@mui/material";
import {AdminSubscriptionList} from "./AdminSubscriptionList";
import {CreateSubscription} from "./CreateSubscription";
import {useState} from "react";


export function SubscriptionControlPanel(props) {

    const [createSubOpen, setCreateSubOpen] = useState(false)
    const [reloadFlag, setReloadFlag] = useState(false)

    return (
        <Paper sx={{p: 2}}>
            <Stack spacing={3}>
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={() => setCreateSubOpen(true)}
                    >
                        Add Membership
                    </Button>
                    <CreateSubscription
                        open={createSubOpen}
                        onClose={() => setCreateSubOpen(false)}
                        onSend={() => {
                            setReloadFlag(true)
                            setCreateSubOpen(false)
                        }}
                    />
                </Box>
                <AdminSubscriptionList reloadFlag={reloadFlag}
                                       onUpdate={() => setReloadFlag(false)}/>
            </Stack>
        </Paper>
    )
}
