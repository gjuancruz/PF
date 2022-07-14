import React from "react";
import Comments from "./Comments";
import SideBar from "./SideBar";

export default function MenuDashboard(){
    return (
        <div class="row bg-dark">          
            <div class="col-sm-4"> <SideBar/> </div>
            <div class="col-sm-8"> <Comments/> </div>
        </div>
    )
}