import React from "react";
import { useState } from "react";
import { CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import { postPaymentMethod } from '../../Redux/actions'

const CheckoutForm = ({showid}) =>{
    const dispatch = useDispatch()
    const stripe = useStripe()
    const idUser = useSelector(state=>state.id)
    const elements = useElements()
    // const userIdCheck = window.localStorage.getItem('userId')
    // const currentUser = allUsers.filter(u =>u.id === userIdCheck)
    const [checked, useChecked] = useState('')
    const handleStripe = async(e) =>{
        e.preventDefault()
        
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
        if(!error){   //pasarle como tercerparametro el id del carrito del usuario
            dispatch(postPaymentMethod(paymentMethod.id,showid,idUser))
            // useChecked(true)
        }else {
            // useChecked(false)
    }
    return(
     <div>
<div class="modal fade" id="staticBackdropay" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content bg-dark">
  <div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">Metodo de Pago
    </h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <p>Ingrese su Tarjeta de Credito</p>
  <form onSubmit={handleStripe}>
        <CardElement className="form-control"/>
        
      </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-warning" onClick={handleStripe}>Realizar Pago</button>
  </div>
</div>
</div>
</div>


</div>
    )
}
}
export default CheckoutForm