
import {Router, Request, Response}  from 'express'
// import { Op } from "sequelize"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const {Movie,Room} = require("../db");

const router = Router()

let date: Date = new Date();
let day = date.getDate();
let month = date.getMonth()
let year = date.getFullYear()


router.get("/billboard", async (req:Request, res:Response) =>{

    try{
        const list = await prisma.movie.findMany({
            where:{
                Release:{}
            }

        })

    }catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})



// router.get("/billboard", async (req:Request, res:Response) =>{

//     try {
//         const list: [] = await Movie.findAll({
//             // include: Room
//             where: {
//                 Release:{
//                     [Op.and]: {
//                         day:{
//                             [Op.lte]: day
//                         },
//                         month:{
//                             [Op.lte]: month
//                         }
//                       }
//                 }
//             }
//         })
//         res.json(list)
//     } catch (error) {
//         res.status(404).json("No se obtuvieron datos")
//     }
// })

// router.get("/next_releases", async (req:Request, res:Response) =>{

//     try {
//         const list: [] = await Movie.findAll({
//             // include: Room
//             where: {
//                 Release:{
//                     [Op.and]: {
//                         day:{
//                             [Op.gte]: day
//                         },
//                         month:{
//                             [Op.gte]: month
//                         }
//                       }
//                 }
//             }
//         })
//         res.json(list)
//     } catch (error) {
//         res.status(404).json("No se obtuvieron datos")
//     }
// })



export default router