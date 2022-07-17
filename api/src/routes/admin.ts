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
    
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

//http://localhost:3001/admin/updateUser
router.put("/updateUser", async (req:Request, res:Response) =>{
    try{
        const {username, email, role, id} = req.body;
        
        const updateUser = await prisma.user.updateMany({
            where: {
                id: id
              },
              data: {
                username:`${username}`,
                email:`${email}`,
                role: role,
              },
    })
    
    res.status(201).json(updateUser)
    
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

//http://localhost:3001/admin/deleteUser
router.delete("/deleteUser", async (req:Request, res:Response) =>{
    try{
        console.log(req.body)
        const {email} = req.body;

        const deleteUser = await prisma.user.delete({
            where: {email:`${email}`},
    })
    
    res.status(201).json(deleteUser)
    
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

//http://localhost:3001/admin/searchUser?name=jose
router.get('/searchUser', async (req: Request, res:Response) =>{
    const {name} = req.query;
    try {
        if(name){
            const seachName = await prisma.user.findMany({
                where: {
                    username: {
                        contains: `${name}`,
                        mode: 'insensitive'
                    },
                    email: {
                        contains: `${name}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(seachName)
        }
        
    } catch (error) {
        res.status(404).json("no se encontro peli con ese nombre")
    }
   
})

export default router;