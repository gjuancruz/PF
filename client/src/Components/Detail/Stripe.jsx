import React from "react";
import { useState } from "react";
import { CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import { useDispatch } from "react-redux";
import { postPaymentMethod } from '../../Redux/actions'

const CheckoutForm = ({showid}) =>{
    const dispatch = useDispatch()
    const stripe = useStripe()

    const elements = useElements()
    // const userIdCheck = window.localStorage.getItem('userId')
    // const currentUser = allUsers.filter(u =>u.id === userIdCheck)
    // console.log('este seria el showid que le esta llegando',showid)
    const handleStripe = async(e) =>{
        e.preventDefault()
        
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card: elements.getElement(CardElement)
        })
        // console.log('soy el paymentMethod',paymentMethod)
        if(!error){   //pasarle como tercerparametro el id del carrito del usuario
            dispatch(postPaymentMethod(paymentMethod.id,showid,'855fa188-ed42-4eb3-80d9-aa1e99485e58'))
        }else console.log(error)
    }
    return(
          <form onSubmit={handleStripe}>
            <CardElement className="form-control"/>
            <button>Realizar pago</button>
          </form>
    )
}

export default CheckoutForm