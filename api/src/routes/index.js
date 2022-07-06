const {Router} =require('express')
const {
    Movie
} = require('../db.js')


const router = Router()





router.get("/movie", async(req,res)=>{
    const id = req.params.id
    try{
        const movie = await Movie.findOne({where:{id:id}})
        res.send(movie)
        }catch(err){
        res.send(err)
    }
})

module.exports = router