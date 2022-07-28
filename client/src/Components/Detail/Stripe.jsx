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

        <div>
          <form onSubmit={handleStripe}>
            <CardElement className="form-control"/>
            <button>Realizar pago</button>
          </form>
        </div>
    </div>
    )
}
}
export default CheckoutForm