import React, {useState} from "react";
import Comments from "./Comments";
import SideBar from "./SideBar";
import Modal from "../reusable/Modal"
import Users from "./Users";


export default function MenuDashboard(){
    const [active, setActive] = useState(false);

    const toggle = ()=>{
      setActive(!active);
    }

    return (
        // <div class="row bg-dark">          
        //     <div class="col-sm-4"> <SideBar/> </div>
        //     <div class="col-sm-8"> <Comments/> </div>
        // </div>
        <>
        <button onClick={toggle}>pueba modal</button>
        <Modal active={active} toggle={toggle}>
            <h4>Probando ventana modal sin estilos</h4>
        </Modal>
        <SideBar/>
        <Users/>
        </>
    )
}