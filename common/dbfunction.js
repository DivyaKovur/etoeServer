var mongodb=require('mongodb')

async function getDb(){
    const MongoClient=mongodb.MongoClient
    const server=await MongoClient.connect('mongodb+srv://etoeapp:etoeapp@etoe.3rjku.mongodb.net/')
    const db=server.db("sms")
return db
}
module.exports=getDb


