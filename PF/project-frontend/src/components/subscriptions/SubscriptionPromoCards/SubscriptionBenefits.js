import Grid2 from "@mui/material/Unstable_Grid2";
import {SUBSCRIPTIONBENEFITS} from "./PromoCardTexts";
import {Stack, Typography} from "@mui/material";

export default function SubscriptionBenefits(){

    const items = SUBSCRIPTIONBENEFITS

    function itemContent(c){
        return (
            <Grid2 md={6} sm={12}>
                <Stack>
                    <Typography variant='h4'>
                        {c.header}
                    </Typography>
                    <Typography>
                        {c.text}
                    </Typography>
                </Stack>
            </Grid2>
        )
    }

    return (
        <Grid2
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{p:4}}
        >
            {items.map(i => itemContent(i))}
        </Grid2>
    )
}
