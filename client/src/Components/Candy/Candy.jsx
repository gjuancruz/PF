import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCandy } from "../../Redux/actions";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import '../Candy/Candy.css'

export default function Candy() {
  const dispatch = useDispatch();
  const allCandy = useSelector((state) => state.storeCandy);
  const price = allCandy.map((c)=>{
    var str1 = JSON.stringify(c.price).slice(-2)
    var str2 = JSON.stringify(c.price).slice(0, -2)
    return{
        name: c.name,
        picture: c.picture,
        price: str2 + "." + str1
    }
  })

  useEffect(() => {
    dispatch(getCandy());
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-lg text-center">
      <h3>Para que disfrutes tu funcion:</h3>
        <div className="row">
          {allCandy &&
            price.map((c,index) => {
              return (
                <div class="col-6 text-center my-2" key={index}>
                  <h5>{c.name}</h5>
                  <img src={c.picture} alt="img not found" className="picture" />
                  <p>Precio: US${c.price}</p>
                </div>
              );
            })}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
