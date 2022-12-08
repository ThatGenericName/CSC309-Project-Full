import {StudioLocator} from "./StudioLocator";
import {Route, Routes} from "react-router-dom";
import ViewStudio from "./StudioView";
import EditStudio from "./EditStudio";
import AddStudio from "./AddStudio";
import Amenity from "../Amenity/Amenity";
import EditAmenity from "../Amenity/EditAmenity";
import AddAmenity from "../Amenity/AddAmenity";
import GymClass from "../GymClasses/GymClass";
import GymClassSchedule from "../GymClasses/GymClassSchedule";
import EditGymClassSchedule from "../GymClasses/EditGymClassSchedule";
import EditGymClass from "../GymClasses/EditGymClass";
import React from "react";


export function StudiosLanding(props){

    return (
        // <StudioLocator/>
            <Routes>
                <Route path="" element={<StudioLocator admin={props.admin}/>} />
                <Route path=":id/view" element={<ViewStudio admin={props.admin}/>} />
                <Route path=":id/edit/" element={<EditStudio admin={props.admin}/>} />
                <Route path="create/" element={<AddStudio admin={props.admin}/>} />
                <Route path=":id/amenities/" element={<Amenity admin={props.admin}/>} />
                <Route path=":id/amenities/">
                    <Route path=":id_2/edit/" element={<EditAmenity admin={props.admin}/>} />
                    <Route path="create/" element={<AddAmenity admin={props.admin}/>} />
                </Route>
                <Route path=":id/gymclasses/" element={<GymClass admin={props.admin}/>} />

                <Route path=":id/gymclasses/">
                    <Route path=":id_2/edit/" element={<EditGymClass admin={props.admin}/>} />
                </Route>



                <Route path=":id/schedules/" element={<GymClassSchedule admin={props.admin}/>} />
                <Route path=":id/schedules/">
                    <Route path=":id_2/edit/" element={<EditGymClassSchedule admin={props.admin}/>} />
                </Route>


            </Routes>
    )

}
