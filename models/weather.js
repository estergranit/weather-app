const mongoose=require('mongoose')

const Weather=mongoose.Schema({
    date:{
        type:Date,
        default:new Date()
        //trim:true --what is it?
    },
    city:{
        type:String,
        // minLength:6,
        // required:true,
        // unique:true,
    },    
    temp:{
        type:Number
    },
    feelLike:[{
        type:Number
    }],
    userId:{
        type:String
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
module.exports=mongoose.model('weather',Weather)