const mongoose=require('mongoose')
require('mongoose-type-email');



const Admin=mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"unknown",
    },
    password:{
        type:String,
        minLength:1,
        required:true,
        unique:true,
    },    
    email:{
        type:mongoose.SchemaTypes.Email
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }]
})

module.exports=mongoose.model('admin',Admin)