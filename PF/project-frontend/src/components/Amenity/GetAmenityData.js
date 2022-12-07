import {LOCALE, BASEURL, BASEURLNOEND} from "../constants"
import axios from "axios";
import {useState} from "react";

export default function GetAmenity(props) {
    const url = BASEURL + "studios/" + props + "/amenities/"

    const [formData, setFormDat] = useState({data: {}, axiosLoading: false})

    if (!formData.axiosLoading) {
         axios.get(url).then(function (response) {
            // console.log(response)
            setFormDat({
                data: response.data,
                axiosLoading: true
            })
        }).catch(function (error) {
            formData.setState({
                axiosLoading: false
            })
        })
    }
    return formData.data

}
