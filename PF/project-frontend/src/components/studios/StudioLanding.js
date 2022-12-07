import {Box, Paper} from "@mui/material";
import {MapComp} from "./MapComp";
import {MapContainer} from "./MapContainer";
import Grid2 from "@mui/material/Unstable_Grid2";
import {StudioLocator} from "./StudioLocator";
import {Route, useSearchParams, Routes} from "react-router-dom";
import ViewStudio from "./StudioView";
import EditStudio from "./EditStudio";
import AddStudio from "./AddStudio";
import Amenity from "../Amenity/Amenity";
import EditAmenity from "../Amenity/EditAmenity";
import AddAmenity from "../Amenity/AddAmenity";
import GymClass from "../GymClasses/GymClass";
import GymClassSchedule from "../GymClasses/GymClassSchedule";
import React from "react";




export function StudiosLanding(){

    return (
        // <StudioLocator/>
            <Routes>
                <Route path="" element={<StudioLocator/>} />
                <Route path=":id/view" element={<ViewStudio />} />
                <Route path=":id/edit/" element={<EditStudio />} />
                <Route path="create/" element={<AddStudio />} />
                <Route path=":id/amenities/" element={< Amenity/>} />
                <Route path=":id/amenities/">
                    <Route path=":id_2/edit/" element={<EditAmenity />} />
                    <Route path="create/" element={<AddAmenity />} />
                </Route>
                <Route path=":id/gymclasses/" element={<GymClass/>} />
                <Route path=":id/schedules/" element={<GymClassSchedule/>} />
            </Routes>
    )

}
