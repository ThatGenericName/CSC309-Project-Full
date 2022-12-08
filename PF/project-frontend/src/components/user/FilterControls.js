import Paper from "@mui/material/Paper";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    Pagination,
    Stack,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import React from "react";


export default class FilterControls extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            filterSetter: props.filterSetter,
            sortData: 'asc',
            filterData: 'all',
            page: 1
        }
    }

    applyFilterState(state){
        this.props.filterSetter({
            sortData: state.sortData,
            filterData: state.filterData,
            page: state.page
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    render(){
        return (
            <Paper sx={{py: 2}}>
                <Stack alignItems="center" spacing={2}>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={6}>
                            <ToggleButtonGroup
                                value={this.state.sortData}
                                color='primary'
                                onChange={(e, val) => {
                                    if (val === null){
                                        return
                                    }
                                    let stateDat = this.state
                                    stateDat.sortData = val
                                    this.setState(stateDat)
                                    this.applyFilterState(stateDat)
                                }}
                                exclusive
                                aria-label="Platform"
                            >
                                <ToggleButton value="asc">Ascending</ToggleButton>
                                <ToggleButton value="des">Descending</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid2>
                        <Grid2 xs={6}>
                            <ToggleButtonGroup
                                value={this.state.filterData}
                                color='primary'
                                onChange={(e, val) => {
                                    if (val === null){
                                        return
                                    }
                                    let stateDat = this.state
                                    stateDat.filterData = val
                                    this.setState(stateDat)
                                    this.applyFilterState(stateDat)
                                }}
                                exclusive
                                aria-label="Platform"
                            >
                                <ToggleButton value="all">All</ToggleButton>
                                <ToggleButton value="past">Past</ToggleButton>
                                <ToggleButton value="future">Future</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid2>
                    </Grid2>
                    <Pagination
                        count={this.props.pcount}
                        onChange={(e, v) => {
                            let stateDat = this.state
                            stateDat.page = v
                            this.setState(stateDat)
                            this.applyFilterState(stateDat)
                        }}/>
                </Stack>
            </Paper>
        )
    }
}



