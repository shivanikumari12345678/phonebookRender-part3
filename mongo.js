//myMongoPass123

import mongoose from "mongoose";

const [,,password,name,number]=process.argv;

if(!password || password.length < 3){
    console.log("enter correct password")
    process.exit()
}

const uri=`mongodb+srv://shivani2:${password}@cluster0.nbj86zf.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(uri)

const phonebookSchema=new mongoose.Schema({
    name:String,
    number:String
})


const Phonebook=mongoose.model("Phonebook",phonebookSchema)
const phonebook=new Phonebook({
    name:name,
    number:number
})


if(process.argv.length === 3){
    Phonebook.find({}).then(result=>{
        console.log("Phonebook :")
        result.forEach(item =>console.log(item))    
    mongoose.connection.close()
    process.exit()
})
}
else{
    if(!name || !number){
        console.log("please provide both name and number")
        process.exit()
    }
    const phonebook=new Phonebook({name,number})
    phonebook.save().then(()=>{
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})
}



