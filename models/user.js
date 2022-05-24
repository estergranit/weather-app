const mongoose=require('mongoose')
require('mongoose-type-email');

const User=mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"unknown",
        //trim:true
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
    weather:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'weather'
    }],
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin'
    }
})
//TODO
// User.pre('remove', async function(next){
//     console.log("remove")
//     await Task.deleteMany({_id:{$in: [this.tasks]}})
//     next;
// })
// User.post('save', async function(next){
//     console.log("save")
//     next;
// })
module.exports=mongoose.model('user',User)