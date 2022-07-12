import {Router, Request, Response, NextFunction}  from 'express';
import { PrismaClient } from '@prisma/client';
import mercadopago from 'mercadopago';

const prisma = new PrismaClient()

const server = Router();

const {ACCESS_TOKEN} = process.env;

mercadopago.configure({
    access_token: ACCESS_TOKEN
});

//cargamos ruta que genera la URL de mercadopago
server.get('/', (req: Request,res: Response,next: NextFunction)=> {
    const id_order = 1

    //cargamos el carrito de la db
    const carrito = [
        {title: "Producto 1", quantity: 5, price: 10.52},
        {title: "Producto 2", quantity: 15, price: 100.50},
        {title: "Producto 3", quantity: 6, price: 200},
    ]

    const items_cine = carrito.map(i => ({
        title: i.title,
        unit_price: i.price,
        quantity: i.quantity,
    }))

    //crea un objeto de preferencia
    let preference = {
        purpose: "wallet_purchase", //acepta solo usuarios registrados
        items: items_cine,
        external_preference: `${id_order}`,
        payment_methods: {
            excluded_payment_types: [
                {
                    id: 'atm' //excluye el medio de pago por cajero automatico
                }
            ],
            installments: 3 //cantidad maxima de cuotas
        },
        back_urls: {
            success: 'http://localhost:3003/mercadopago/pagos',
            failure: 'http://localhost:3003/mercadopago/pagos',
            pending: 'http://localhost:3003/mercadopago/pagos',
        },
    };

    mercadopago.preferences.create(preference)
    .then(function(response:any){
        console.info('respondio')
        //este valor reemplazará el string "<= global.id %>" en el html
        //global.id = response.body.id;
        console.log(response.body);
        res.json({id:response.body.id});
    })
    .catch(function(error:any){
        console.log(error);
    })
})


//ruta que recibe la informacion del pago
server.get("/payments", (req: Request,res: Response)=>{
    console.log("RUTA DE PAGOS", req)
    // const payment_id = req.query.payment_id
    // const payment_status = res.query.payment_status
    // const external_reference = req.query.external_reference
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.external_preference
    })
})

export default server;