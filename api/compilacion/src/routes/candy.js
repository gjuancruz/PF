"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// http://localhost:3001/candy
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield prisma.menu.findMany({});
        return res.json(food);
    }
    catch (e) {
        res.json(e.message);
    }
}));
// http://localhost:3001/candy/add
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const { index, quantity, cartId, userId } = req.body;
        console.log(index, quantity, userId);
        let newCandy;
        //buscar el card id del usuario
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
            }
        });
        console.log("info user", user);
        const product = yield prisma.menu.findUnique({
            where: { id: index }
        });
        const userCandy = (_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.candy.find(item => item.name === product.name);
        console.log('this is product :', product);
        const totalPrice = product.price * quantity;
        if (userCandy) {
            newCandy = yield prisma.candy.update({
                where: {
                    //@ts-ignore
                    id: userCandy.id
                    // cartId:user?.cart?.id
                    // name:product.name
                },
                data: {
                    name: product.name,
                    quantity: userCandy.quantity + quantity,
                    totalPrice: userCandy.totalPrice + totalPrice,
                    cartId: (_b = user === null || user === void 0 ? void 0 : user.cart) === null || _b === void 0 ? void 0 : _b.id
                }
            });
            console.log("Update Candy respuesta ", newCandy);
        }
        else {
            newCandy = yield prisma.candy.create({
                data: {
                    name: product.name,
                    quantity,
                    totalPrice,
                    cartId: (_c = user === null || user === void 0 ? void 0 : user.cart) === null || _c === void 0 ? void 0 : _c.id
                    // cartId
                }
            });
            console.log('this is newCandy :', newCandy);
        }
        const cart = yield prisma.cart.findUnique({
            where: { id: (_d = user === null || user === void 0 ? void 0 : user.cart) === null || _d === void 0 ? void 0 : _d.id }
        });
        console.log('this is cart :', cart);
        const addNewCandy = yield prisma.cart.update({
            where: { id: (_e = user === null || user === void 0 ? void 0 : user.cart) === null || _e === void 0 ? void 0 : _e.id },
            data: {
                // @ts-ignore
                orderPrice: cart.orderPrice + newCandy.totalPrice,
                // @ts-ignore
                userId: cart.userId,
                candy: {
                    connect: {
                        id: newCandy === null || newCandy === void 0 ? void 0 : newCandy.id
                    }
                }
            }
        });
        console.log('this is addNewCandy :', addNewCandy);
        const newCart = yield prisma.cart.findUnique({
            where: { id: (_f = user === null || user === void 0 ? void 0 : user.cart) === null || _f === void 0 ? void 0 : _f.id }
        });
        return res.json(newCart);
    }
    catch (e) {
        console.log(e.message);
        res.status(404).json(e.message);
    }
}));
// http://localhost:3001/candy/delete
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k;
    try {
        const { index, quantity, cartId, userId } = req.body;
        let newCandy;
        //buscar el card id del usuario
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
            }
        });
        console.log("info user", user);
        const product = yield prisma.menu.findUnique({
            where: { id: index }
        });
        const userCandy = (_g = user === null || user === void 0 ? void 0 : user.cart) === null || _g === void 0 ? void 0 : _g.candy.find(item => item.name === product.name);
        const userQuantity = userCandy === null || userCandy === void 0 ? void 0 : userCandy.quantity;
        console.log('this is userQuantity :', userQuantity);
        console.log('this is product :', product);
        // @ts-ignore
        const totalPrice = product.price * userQuantity;
        if (userCandy) {
            newCandy = yield prisma.candy.deleteMany({
                where: {
                    //@ts-ignore
                    id: userCandy.id
                    // cartId:user?.cart?.id
                    // name:product.name
                },
            });
        }
        const cart = yield prisma.cart.findUnique({
            where: { id: (_h = user === null || user === void 0 ? void 0 : user.cart) === null || _h === void 0 ? void 0 : _h.id }
        });
        console.log('this is cart :', cart);
        yield prisma.cart.update({
            where: { id: (_j = user === null || user === void 0 ? void 0 : user.cart) === null || _j === void 0 ? void 0 : _j.id },
            data: {
                // @ts-ignore
                orderPrice: cart.orderPrice - totalPrice,
                // @ts-ignore
                userId: cart.userId,
            }
        });
        const newCart = yield prisma.cart.findUnique({
            where: { id: (_k = user === null || user === void 0 ? void 0 : user.cart) === null || _k === void 0 ? void 0 : _k.id }
        });
        return res.json(newCart);
    }
    catch (e) {
        console.log(e.message);
        res.status(404).json(e.message);
    }
}));
// http://localhost:3001/candy/modify
// router.put('/modify',  async (req:Request,res:Response)=>{
//     try {
//         const {index, quantity, cartId, userId} = req.body
//         let newCandy;
//         //buscar el card id del usuario
//         const user = await prisma.user.findUnique({
//             where: {id: userId},
//             include: {
//                 cart:  {
//                     include : {
//                         tickets: true,
//                         candy: true
//                     }
//                 }
//             }
//         })
//         console.log("info user", user);
//         const product : any= await prisma.menu.findUnique({
//             where:{id:index}
//         })
//         const userCandy = user?.cart?.candy.find(item => item.name === product.name);
//         console.log('this is product :',product)
//         const totalPrice = product.price*quantity
//         if(userCandy){
//             newCandy = await prisma.candy.update({
//                 where:{
//                     //@ts-ignore
//                     id: userCandy.id
//                     // cartId:user?.cart?.id
//                     // name:product.name
//                 },
//                 data:{
//                     name:product.name,
//                     quantity: userCandy.quantity - quantity,
//                     totalPrice: userCandy.totalPrice - totalPrice,
//                     cartId: user?.cart?.id
//                 }
//             })
//             console.log("Update Candy respuesta ", newCandy);        
//         }
//         const cart = await prisma.cart.findUnique({
//             where:{id:user?.cart?.id}
//         })
//         console.log('this is cart :',cart)
//         const deleteCandy = await prisma.cart.update({
//             where:{id:user?.cart?.id},
//             data:{
//                 // @ts-ignore
//                 orderPrice: cart.orderPrice - newCandy.totalPrice,
//                 // @ts-ignore
//                 userId: cart.userId,
//                 candy:{
//                     connect:{
//                         id:newCandy?.id
//                     }
//                 }
//             }
//         })
//         const newCart = await prisma.cart.findUnique({
//             where:{id:user?.cart?.id}
//         })
//         return res.json(newCart)
//     }catch(e:any){
//         console.log(e.message)
//         res.status(404).json(e.message)
//     }
// })
exports.default = router;
//# sourceMappingURL=candy.js.map