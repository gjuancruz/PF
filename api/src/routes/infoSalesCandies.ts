import { PrismaClient } from "@prisma/client";
import { Router,Request,Response } from "express";

const router = Router()
const prisma = new PrismaClient()

///////// info de ventas de cada producto del candy/////////
/*{
    nombreProd:
    cantidad vendidos:
    fecha:
}
*///http://localhost:3001/salesCandies
router.get('/',async(req:Request,res:Response)=>{
    try{
        const sale = await prisma.sale.findMany({include:{candy:true}})
        res.status(200).send(sale)
    }catch(error:any){
        res.send(error.message)
    }
})
/*
[
    {
        "id": "e23b7ef0-7e2f-4eca-89bb-6c36428c244e",
        "receipt": "pi_3LQD5CJSzK67Ievu1uuWc9pt",
        "userId": "7d9e8445-43b4-4bb9-b630-2a19bceccb7f",
        "salePrice": 400,
        "createdAt": "2022-07-27T16:27:39.833Z",
        "candy": []
    },
    {
        "id": "eca03d89-163a-4e3d-a2d8-34a97c11c4fc",
        "receipt": "pi_3LQD5CJSzK67Ievu1Y2KRxfP",
        "userId": "7d9e8445-43b4-4bb9-b630-2a19bceccb7f",
        "salePrice": 400,
        "createdAt": "2022-07-27T16:27:39.894Z",
        "candy": [
            {
                "id": "7c730876-d6de-48ea-bd53-708aa19703a2",
                "name": "COMBO GRANDE",
                "quantity": 1,
                "totalPrice": 200,
                "cartId": null,
                "saleId": "eca03d89-163a-4e3d-a2d8-34a97c11c4fc"
            }
        ]
    }
]
*/


///http://localhost:3001/salesCandies/totalCandyMonth
router.get('/totalTickets',async(req:Request,res:Response)=>{
    try{
        const sale = await prisma.tickets.findMany({})
        //let productsSalesPerMes = [{},{},{},{},{},{},{},{},{},{},{},{}];
        
        //let prodTotalesMes = sale.filter((e:any)=>{e.dateFormat?.slice(0,3) === 'Jul'})
        console.log(sale)
        res.status(200).send(sale)

    }catch(error:any){
        res.send(error.message)
    }
})
///////// productos totales vendidos por mes de cada uno////////
/*
{
    nombreProd: pochoclos
    cantidad: 560
    montoTotal: 648551
    mes: 06
}
{
    nombreProd: nachos
    cantidad: 700
    montoTotal: 216545
    mes: 07
}
*/

export default router