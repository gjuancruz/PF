import React, {useState} from "react";
import SideBar from "./SideBar";
import Modal from "../reusable/Modal"
import Users from "./Users";


export default function MenuDashboard(){
    const [active, setActive] = useState(false);

    const toggle = ()=>{
      setActive(!active);
    }

    return (
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