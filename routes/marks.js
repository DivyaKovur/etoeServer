var express = require('express')
var mongodb = require('mongodb')
var objectId = mongodb.ObjectId;
var router = express.Router();
var jwt = require('jsonwebtoken')
var getDB = require('../common/dbfunction')
var validateToken = require('../common/ValidateToken')

router.post(
    "/register",
    validateToken,
    async function (req, res, next) {// req received
        try {
            const data = req.body.data;
            const db = await getDB();
            const collection = db.collection('marks')
            const result = await collection.insertOne(data)
            res.send(result)

        } catch (ex) {
            res.send(ex.message);
        }
    })

router.get(
    '/get-std',
    validateToken,
    async function (req, res, next) {
        try {
            const db = await getDB();
            const collection = db.collection('marks');
            const result = await collection.find().toArray()
            res.send(result);

        } catch (ex) {
            res.send(ex.message);
        }
    })

router.put('/update-std', validateToken, async function (req, res, next) {
    try {
        const id = req.query.id;
        const data = req.body.data;
        const db = await getDB()
        const collection = db.collection("marks")
        const result = await collection.updateOne({ _id: objectId.createFromHexString(id) }, { $set: data })
        res.send(result)
    } catch (ex) {
        console.error(ex);
        res.send(ex);
    }
})

router.delete('/delete-std/:id', validateToken, async function (req, res, next) {
    try {
        var id = req.params.id
        const db = await getDB();
        const collection = db.collection("narks")
        const result = await collection.deleteOne({ _id: objectId.createFromHexString(id) })
        res.send(result)
    } catch (ex) {

    }

})

router.post("/login", function (req, res, next) {
    const { uid, pwd } = req.body
    if (uid === 'div' && pwd === 'saidiv') {
        const token = jwt.sign({ uid, pwd }, "appToken")
        res.send([{ uid, pwd, token }])
    } else {
        res.send([])
    }
})
module.exports = router;