import react, {useState} from "react";
import Geocode from 'react-geocode'
import {BASEURL, GOOGLEAPIKEY} from "../constants";
import {APIContext} from "../APIContextProvider";
import {
    Box,
    Pagination,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {MapContainer} from "./MapContainer";
import Button from "@mui/material/Button";
import axios from "axios";
import {useSearchParams} from "react-router-dom";
import {ObjectDeepClone} from "../Utility";
import StudioList from "./StudioList";



export function StudioLocator(){
    let [searchParams, setSearchParams] = useSearchParams()


    let params = {
        studio_name: searchParams.get('studio_name'),
        amenity: searchParams.get('amenity'),
        class_name: searchParams.get('class_name'),
        coach_name: searchParams.get('coach_name'),
        zip: searchParams.get('zip')
    }

    Object.keys(params).forEach(k => {
        if (params[k] === null){
            params[k] = ""
        }
    })

    let a = 1

    return (
        <StudioLocatorClass searchParams={params} searchParamSetter={setSearchParams}/>
    )
}

class StudioLocatorClass extends react.Component{
    static contextType = APIContext

    constructor(props, context) {
        super(props, context);
        if (props.searchParams.zip !== undefined && props.searchParams.zip !== null){
            this.setZipCode(props.searchParams.zip)
        }

        this.state = {
            userZipCode : props.searchParams.zip,
            userLocation: {
                lat: null,
                lng: null
            },
            searchParams: props.searchParams,
            responseList: [],
            pages: 0,
            initSearch: true,
            cObjList: [],
            targetPage: 1,
            urlParamSet: props.searchParamSetter
        }
    }

    getStudioList(comp){

        const targetURL = BASEURL + "/studios/"
        const searchParams = comp.state.searchParams
        const params = {
            n: searchParams.studio_name,
            a: searchParams.amenity,
            cln: searchParams.class_name,
            chn: searchParams.coach_name,
            page: comp.targetPage
        }

        var paramClone = ObjectDeepClone(searchParams)
        Object.entries(paramClone).forEach(([key, value]) => {
            if (value === ""){
                delete paramClone[key]
            }
        })
        comp.state.urlParamSet(paramClone)

        const formData = new FormData()
        const loc = comp.state.userLocation
        if (loc.lat !== null){
            const locStr = loc.lat + "," + loc.lng
            formData.set('location', locStr)
        }

        const reqData = {
            url: targetURL,
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: params,
            data: formData
        }

        axios(reqData).then(function(response){
            let cObjList = comp.getCoordinateObjects(response.data['results'])
            comp.setState({
                pages: Math.ceil(response.data['count'] / 10),
                responseList: response.data['results'],
                cObjList: cObjList
            })
        }).catch(function(error){
            let a = 1
        })
    }

    reload(){
        this.setState({initSearch: false})
        this.getStudioList(this)
    }

    getCoordinatesFromZipCode(zipCode){
        if (zipCode.length === 0){
            this.setState({
                userLocation: {
                    lat: null,
                    lng: null
                }
            })
            return
        }
        else if (zipCode.length !== 6){
            return
        }

        Geocode.setApiKey(GOOGLEAPIKEY)
        Geocode.setLanguage('en')
        Geocode.setRegion('ca')

        let comp = this

        Geocode.fromAddress(zipCode).then(function (results){
            if (results.status='OK'){
                const {lat, lng} = results.results[0].geometry.location
                comp.setState({userLocation: {
                    lat: lat,
                    lng: lng
                    }
                })
            }
            else{
                comp.setState({userLocation: {
                    lat: null,
                    lng: null
                    }
                })
            }
        }).catch(function(error){
            if (error.message === "undefined.\\nServer returned status code ZERO_RESULTS"){
                comp.setState({userLocation: {
                    lat: null,
                    lng: null
                    }
                })
            }
        })
    }

    setSearchParam(obj) {
        const clone = this.state.searchParams
        Object.entries(obj).forEach(entry => clone[entry[0]] = entry[1])
        this.setState({searchParams: clone})
    }

    setZipCode(zipCode){
        this.setState({userZipCode: zipCode})
        this.getCoordinatesFromZipCode(zipCode)
    }

    searchForm(){

        return (
            <Grid2 container spacing={3}>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.studio_name}
                        label='Studio Name'
                        fullWidth
                        onChange={(e) => this.setSearchParam({studio_name: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.amenity}
                        label='Amenity'
                        fullWidth
                        onChange={(e) => this.setSearchParam({amenity: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.class_name}
                        label='Class Name'
                        fullWidth
                        onChange={(e) => this.setSearchParam({class_name: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={3} sm={6}>
                    <TextField
                        value={this.state.searchParams.coach_name}
                        label='Coach Name'
                        fullWidth
                        onChange={(e) => this.setSearchParam({coach_name: e.target.value})}
                    />
                </Grid2>
                <Grid2 md={5} sm={4}/>
                <Grid2 md={2} sm={4}>
                    <TextField
                        value={this.state.userZipCode}
                        label='Zip Code'
                        fullWidth
                        onChange={(e) => this.setZipCode(e.target.value)}
                    />
                </Grid2>
                <Grid2 md={5} sm={4}/>
            </Grid2>
        )
    }

    getCoordinateObjects(list){
        const cobjList = []

        list.forEach(studio => {
            var geoLocSplit = studio.geo_loc.split(',')
            var lat = parseFloat(geoLocSplit[0])
            var lng = parseFloat(geoLocSplit[1])

            let coordObj = {
                id: studio.id,
                name: studio.name,
                position: {
                    lat: lat,
                    lng: lng
                }
            }
            cobjList.push(coordObj)
        })

        return cobjList
    }


    render(){
        if (this.state.initSearch){
            this.setState({initSearch: false})
            this.getStudioList(this)
        }

        let userLoc = this.state.userLocation

        let userLocObj = undefined

        if (userLoc.lat !== null){
            userLocObj = {
                id: 0,
                name: "You",
                position: { lat: userLoc.lat, lng: userLoc.lng }
            }
        }

        const comp = this
        const list = this.state.cObjList

        return (
            <Box
                sx={{
                    p:3,
                    textAlign: 'center'
                }}
            >
                <Stack spacing={3}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "50vh"
                        }}
                    >
                        <MapContainer markers={list} userMarker={userLocObj}/>
                    </Box>
                    <Paper
                        sx={{
                            p:3,
                            textAlign: 'center'
                        }}
                    >
                        <Stack
                            sx={{
                                width: "100%"
                            }}
                            spacing={3}
                        >
                            {this.searchForm()}
                            <Box>
                                <Button
                                    variant='contained'
                                    size='large'
                                    onClick={() => {this.getStudioList(comp)}}
                                >
                                    Search!
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                    <Paper sx={{p:3}}>
                        <Stack spacing={3}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Pagination
                                    count={this.state.pages}
                                    onChange={(e, v) => {
                                        this.setState({
                                            targetPage: v,
                                            initSearch: true
                                        })
                                    }}
                                />
                            </Box>
                            <StudioList items={this.state.responseList} onSend={this.reload}/>
                        </Stack>
                    </Paper>
                </Stack>
            </Box>
        )
    }
}
