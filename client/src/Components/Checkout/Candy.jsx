import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addCandy, postCandys, deleteCandys} from '../../Redux/actions';


export function Candy() {
    const storeCandy = useSelector((state) => state.storeCandy);  //candy  
    const cart = useSelector((state) => state.cart);  //candy
    const idUser = useSelector((state) => state.id);
    const dispatch = useDispatch();

    useEffect(() => {   //candy
        setTRADICIONAL(obtenerCantidad("COMBO TRADICIONAL"));
        setNACHOS(obtenerCantidad("COMBO NACHOS"));
        setGRANDE(obtenerCantidad("COMBO GRANDE"));
        setICEE(obtenerCantidad("COMBO ICEE"));
    }, [cart]);


    const [cafe, setCafe] = useState(0);
    const [refresco, setRefresco] = useState(0);
    const [hotdog, setHotdog] = useState(0);
    const [pay,setPay]=useState(false)
    // const [carrito,setCarrito] = useState(cart);

    const [TRADICIONAL, setTRADICIONAL] = useState({ id: 0, value: 0 });
    const [NACHOS, setNACHOS] = useState({ id: 0, value: 0 });
    const [GRANDE, setGRANDE] = useState({ id: 0, value: 0 });
    const [ICEE, setICEE] = useState({ id: 0, value: 0 });


    const handleClick = (event) => {    //candy
        if (event.target.name === "cafe") setCafe(event.target.value);
        if (event.target.name === "refresco") setRefresco(event.target.value);
        if (event.target.name === "hotdog") setHotdog(event.target.value);
    
        if (event.target.name === "COMBO TRADICIONAL")
          setTRADICIONAL({ ...TRADICIONAL, value: event.target.value });
        if (event.target.name === "COMBO NACHOS")
          setNACHOS({ ...NACHOS, value: event.target.value });
        if (event.target.name === "COMBO GRANDE")
          setGRANDE({ ...GRANDE, value: event.target.value });
        if (event.target.name === "COMBO ICEE")
          setICEE({ ...ICEE, value: event.target.value });
      };

    const obtenerCantidad = (nombre) => {   //candy
        let idCandy;
        let quantityCandy;
        let productos = [];
    
        if (storeCandy.length) {
          idCandy = storeCandy.find((item) => item.name === nombre);
          quantityCandy = cart.length
            ? cart.find((item) => item.name === nombre)
            : 0;
    
          const state = {
            id: idCandy.id,
            value: quantityCandy ? quantityCandy.quantity : 0,
          };
    
          //eval(item.name.split(' ')[1])  eval(item.name.split(' ')[1]).value
          if (quantityCandy) {
            for (let i = 0; i < quantityCandy.quantity; i++) {
              productos.push(nombre);
            }
            dispatch(addCandy(productos));
          }
    
          return state;
        } else {
          const defaultState = {
            id: 0,
            value: 0,
          };
          return defaultState;
        }
    };

    const handleSubmit = (event) => {   //candy
        console.log(event.target.name);
        const productos = []
        if(event.target.name === "COMBO TRADICIONAL"){
            for (let i = 0; i < TRADICIONAL.value; i++) {
                productos.push("COMBO TRADICIONAL")
            }
            dispatch(postCandys({ index: TRADICIONAL.id, quantity: Number(TRADICIONAL.value), userId: idUser }))
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            console.log(productos);
            return dispatch(addCandy(productos))
            // return delayTotalPrice();
            // return delayTotalPrice();
        }
        if(event.target.name === "COMBO NACHOS"){
            for (let i = 0; i < NACHOS.value; i++) {
                productos.push("COMBO NACHOS")
            }
            console.log(productos);
            dispatch(postCandys({ index: NACHOS.id, quantity: Number(NACHOS.value), userId: idUser }))
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            // delayTotalPrice();
            return dispatch(addCandy(productos))
        }
        if(event.target.name === "COMBO GRANDE"){
            for (let i = 0; i < GRANDE.value; i++) {
                productos.push("COMBO GRANDE")
            }
            dispatch(postCandys({ index: GRANDE.id, quantity: Number(GRANDE.value), userId: idUser }))
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            // delayTotalPrice();
            return dispatch(addCandy(productos))
        }
        if(event.target.name === "COMBO ICEE"){
            for (let i = 0; i < ICEE.value; i++) {
                productos.push("COMBO ICEE")
            }
            dispatch(postCandys({ index: ICEE.id, quantity: Number(ICEE.value), userId: idUser }))
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            // delayTotalPrice();
            return dispatch(addCandy(productos))
        }
        if(event.target.name === "cafe"){
            for (let i = 0; i < cafe; i++) {
                productos.push("cafe")
            }
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            return dispatch(addCandy(productos))
        }
        if(event.target.name === "refresco"){
            for (let i = 0; i < refresco; i++) {
                productos.push("refresco")
            }
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            return dispatch(addCandy(productos))
        }
        if(event.target.name === "hotdog"){
            for (let i = 0; i < hotdog; i++) {
                productos.push("hotdog")
            }
            // setTimeout(() => {
            //   dispatch(getOrderPrice({idUser: idUser}))
            // }, 500);
            return dispatch(addCandy(productos))
        }
    
        if(event.target.name === "COMBO TRADICIONALdelete"){
          productos.filter((p) => p !== 'COMBO TRADICIONAL')
          // setTimeout(() => {
          //   dispatch(getOrderPrice({idUser: idUser}))
          // }, 500);
          // delayTotalPrice();
          return dispatch(deleteCandys({index: TRADICIONAL.id, userId: idUser}))
      }
    
      if(event.target.name === "COMBO NACHOSdelete"){
        productos.filter((p) => p !== 'COMBO NACHOS')
        dispatch(deleteCandys({index: NACHOS.id, userId: idUser}))
        // setTimeout(() => {
        //   dispatch(getOrderPrice({idUser: idUser}))
        // }, 500);
        // delayTotalPrice();
        return dispatch(addCandy(productos))
      }
    
      if(event.target.name === "COMBO GRANDEdelete"){
        productos.filter((p) => p !== 'COMBO GRANDE')
        dispatch(deleteCandys({index: GRANDE.id, userId: idUser}))
        // setTimeout(() => {
        //   dispatch(getOrderPrice({idUser: idUser}))
        // }, 500);
        // delayTotalPrice();
        return dispatch(addCandy(productos))
      }
    
      if(event.target.name === "COMBO ICEEdelete"){
        productos.filter((p) => p !== 'COMBO ICEE')
        dispatch(deleteCandys({index: ICEE.id, userId: idUser}))
        // setTimeout(() => {
        //   dispatch(getOrderPrice({idUser: idUser}))
        // }, 500);
        // delayTotalPrice();
        return dispatch(addCandy(productos))
      }
    
      // delayTotalPrice();
      // dispatch(userCart({idUser:idUser}));
    }

    console.log("cart:",cart);

    return(
        <div
            className="modal fade"
            id="staticBackdrop1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg-prueba">
              <div className="modal-content bg-dark">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    ¡Disfruta de tu funcion con estas promos!
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row align-items-start">
                    <div className="col-12">
                      {storeCandy.map((item) => (
                        <div>
                          <h4>{item.name}</h4>
                          <img src={item.picture} width={"120px"} />
                          <span style={{ paddingRight: "10px" }}>
                            Price: {item.price}
                          </span>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            style={{ width: "60px" }}
                            name={item.name}
                            onChange={handleClick}
                            value={eval(item.name.split(" ")[1]).value}
                          />
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleSubmit}
                            name={item.name}
                          >
                            Agregar
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleSubmit}
                            name={item.name + "delete"}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* <div className="col">One of three columns</div>
                <div className="col">One of three columns</div> */}
                  </div>
                </div>
                <div className="modal-footer">
                  
                </div>
              </div>
            </div>
          </div> 
        //   {/* aqui termina modal candy */}
    )
}