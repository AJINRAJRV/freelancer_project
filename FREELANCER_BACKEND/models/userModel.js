import mongoose from "mongoose"
const {Schema}=mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:false,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:false,
    },
    desc:{
        type:String,
        required:false,
    },
    isSeller:{
        type:Boolean,
        required:false,
        default: false,
    },
},{
    timestamps:true
});


const userData=mongoose.model('user',userSchema);
export default userData;