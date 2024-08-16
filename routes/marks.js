var express= require ('express')
var mongodb=require('mongodb')
var router=express.Router();
router.post('/save', async function(req,res,next){
   try{ 
    const data=req.body.data
    const MongoClient=mongodb.MongoClient
    const server=await MongoClient.connect('mongodb+srv://etoeapp:etoeapp@etoe.3rjku.mongodb.net/')
   const db=server.db("sms")
   const collection=db.collection('marks')
   const result= await collection.insertOne(data)
   res.send(result)

}catch(ex){
    res.send(ex.messsage)
}

    // res.send(`hello express am ${name} from  ${loc}`)

})

module.exports=router;