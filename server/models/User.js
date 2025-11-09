const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userAddress:{
        type:String,
        required:true
    },
    encryptionKey:{
        type:Buffer,
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    folders:[
        {
            folderName:String,
            files:[
                {
                    ipfsHash:String,
                    fileName:String,
                    fileDescription:String,
                }

            ]
        }
    ]

})

const UserModel = mongoose.model("users",UserSchema);
module.exports=UserModel