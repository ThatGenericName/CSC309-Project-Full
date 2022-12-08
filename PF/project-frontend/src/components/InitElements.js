import React from 'react';
import {Box} from "@mui/material";


class InitElements extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Box>
                {this.props.children}
            </Box>
        );
    }
}

export default InitElements;
