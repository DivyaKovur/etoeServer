var express= require ('express')
var getDb=require('../common/dbfunction')
var mongodb=require('mongodb')
var router=express.Router();
router.post('/save', async function(req,res,next){
   try{ 
    const data=req.body.data
const db= await getDb()
   const collection=db.collection('marks')
   const result= await collection.insertOne(data)
   res.send(result)

}catch(ex){
    res.send(ex.messsage)
}

    // res.send(`hello express am ${name} from  ${loc}`)

})

router.get('/getNames', async function(req,res,next){
    try{
    const db= await getDb()
       const collection=db.collection('marks')
       const result= await collection.find().toArray()
       res.send(result)
    }   catch(ex){
        res.send(ex.messsage)
    }   
})


module.exports=router;