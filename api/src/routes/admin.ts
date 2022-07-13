import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient, Prisma} from '@prisma/client'


const prisma = new PrismaClient()

const router = Router();

//http://localhost:3001/admin
router.get("/", async (req:Request, res:Response) =>{
    
    try{
        const users = await prisma.user.findMany({})
        res.json(users);
    
    }catch (error:any) {
        res.status(404).json("No hay usuarios que mostrar")
    }
})

//http://localhost:3001/admin/createUser
router.post("/createUser", async (req:Request, res:Response) =>{
    try{
        const {username, password, email, role} = req.body
        let user: Prisma.UserCreateInput
        user={
            username,
            password,
            email,
            role
        }
        
        const createUser = await prisma.user.create({
            data: user
    })
    
    res.status(201).json(createUser)
    
    }catch(e){
        res.status(404).json("no se pudo crear el user")
    }
})

//http://localhost:3001/admin/updateUser
router.put("/updateUser", async (req:Request, res:Response) =>{
    try{
        const {username, email, role} = req.body;
        
        const updateUser = await prisma.user.update({
            where: {email: `${email}`},
            data: {username: `${username}`,role: role}
    })
    
    res.status(201).json(updateUser)
    
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

//http://localhost:3001/admin/deleteUser
router.delete("/deleteUser", async (req:Request, res:Response) =>{
    try{
        const {email} = req.body;
        
        const deleteUser = await prisma.user.delete({
            where: {email: `${email}`},
    })
    
    res.status(201).json(deleteUser)
    
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

export default router;