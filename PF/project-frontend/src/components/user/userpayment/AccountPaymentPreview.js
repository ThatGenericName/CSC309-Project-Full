import Grid2 from "@mui/material/Unstable_Grid2";
import {PaymentPreview} from "../PaymentPreview";
import {Box, Card, Stack} from "@mui/material";


export function AccountPaymentPreview(props){
    const data = props.data

    if (data === null){
        return (
            <Box
                style={{
                    width:"100%",
                    height:"25%",
                    textAlign:'center'
                }}
            >
                <Card
                    sx={{p:3}}

                >
                    You do not have a payment method set
                </Card>
            </Box>
        )
    }

    return (
        <Stack>
            <PaymentPreview cardData={data}/>
        </Stack>
    )


}
