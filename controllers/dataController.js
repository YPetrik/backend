const {Posts, Entries} = require('../db/models')
const { v4: uuidv4 } = require('uuid')

class DataController{
    async createData(req, res){
        try {
            const temp = await Entries.findOne({
                where:{
                    table:'Posts'
                }
            })
            if(!temp){
                 await Entries.create({f_id:uuidv4(),table:"Posts"})
            }
            const {data, accessTimesCount, expirationTime} = req.body
            function makeShareCode(){
                let text = "";
                let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (let i = 0; i < 5; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            };
            const adminCode = 'bcbf1151-ec7f-4a04-82e1-91faa6236bbb'
            const shareCode = makeShareCode()
            await Posts.create({data, accessTimesCount, expirationTime, shareCode, adminCode})
            res.json({shareCode,adminCode})

        }catch (error){
            console.log(error)
        }
    }
    async updateData(req, res){
        try {
            const {data, accessTimesCount, expirationTime, adminCode } = req.body
            await Posts.update({data, accessTimesCount, expirationTime}, {
                where: {
                    adminCode
                }
            })
           res.sendStatus(200)
        }catch (error){
            console.log(error)
            res.sendStatus(500)
        }
    }
    async getData(req, res){
        try {
          const {shareCode} = req.params
            const result = await Posts.findOne({
                where: {
                    shareCode
                }
            })
            res.json(result.data)
        }catch (error){
            console.log(error)
            res.sendStatus(400).json(error)
        }
    }
    async deleteData(req, res){
        try {
            const {adminCode} = req.body
            const result = await Posts.destroy({
                where: {
                    adminCode
                }
            })
            res.sendStatus(200)
        }catch (error){
            console.log(error)
            res.sendStatus(400)
        }
    }
    async deleteAllData(req, res){
        try {
            const {code} = req.params
            await Posts.destroy({
                where: {
                    adminCode: code
                }
            })
            res.json(uuidv4())
        }catch (error){
            console.log(error)
        }
    }
}
module.exports = new DataController()
