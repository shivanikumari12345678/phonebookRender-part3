import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery',false)
const url=process.env.MONGODB_URI

mongoose.connect(url)
.then(()=>console.log("connected to mongoDB"))
.catch((e)=>console.log("error in connecting to mongoDB"))

const phonebookSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true
    },
    number:{
        type:String,
            validate: {
        validator: function(v) {
            return /^\d{2,3}-\d+$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
        },
        required:true
    }
})

phonebookSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Phonebook=mongoose.model('Phonebook',phonebookSchema)
export default Phonebook



