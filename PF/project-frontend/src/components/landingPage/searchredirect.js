import react from "react";
import {TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";


export class Searchredirect extends react.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            zipcode: ""
        }
    }


    render() {

        let targetLink = '/studios/?zip=' + this.state.zipcode

        return (
            <react.Fragment>
                <Grid2 xs={3}/>
                <Grid2 xs={3}>
                    <TextField
                        value={this.state.zipcode}
                        label='Zip Code'
                        fullWidth
                        size='small'
                        onChange={(e) => this.setState({zipcode: e.target.value})}
                    />
                </Grid2>
                <Grid2 xs={3}>
                    <Button
                        variant={'contained'}
                        component={Link}
                        to={targetLink}
                    >
                        Find A Studio
                    </Button>
                </Grid2>
            </react.Fragment>
        )
    }

}
