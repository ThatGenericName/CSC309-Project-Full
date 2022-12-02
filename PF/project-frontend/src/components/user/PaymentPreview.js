import {Card} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";


export function PaymentPreview(props){
    const cardDat = props.cardData

    const formatExpDat = (month, year) => {
        var y = "" + year
        y = y[2] + y[3]
        var m = month > 9 ? "" + month : "0" + month
        return m + "/" + y
    }

    return (
        <Card
            variant="outlined"
            justifyContent="center"
            sx={{p:1}}
        >
            <Grid2 container>
                <Grid2 xs={4}>
                    {cardDat['card_type']}
                </Grid2>
                <Grid2 xs={8}>
                    {cardDat['card_num']}
                </Grid2>
                <Grid2 xs={4}>
                    {formatExpDat(cardDat['exp_month'], cardDat['exp_year'])}
                </Grid2>
                <Grid2 xs={8}>
                    {cardDat['card_name']}
                </Grid2>
            </Grid2>
        </Card>
    )

}
