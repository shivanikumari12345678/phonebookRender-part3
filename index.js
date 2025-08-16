import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('body',(req,res)=>{
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :body'))

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.get("/api/persons",(req,res)=>{
    res.send(persons)
})

app.get("/info",(req,res)=>{
    const noOfInfo=persons.length;
    const now=new Date()
    const date=now.toString()
    res.send(`<div>
        <p>Phonebook has info for ${noOfInfo} persons</p>
        <p>${date}</p>
    </div>`
    )    
})

app.get("/api/persons/:id",(req,res)=>{
    const id=req.params.id;
    const person=persons.find(p=>p.id===id)
    if(person){
        res.send(person)
          
    }else{
        res.status(404).end() 
    }
})

app.delete("/api/persons/:id",(req,res)=>{
    const id=req.params.id;
    console.log("Deleting ID:", id);
    console.log("Before:", persons);
    persons=persons.filter(p=>p.id !== id)
    console.log("After:", persons);
    res.status(204).end()
})


app.post("/api/persons",(req,res)=>{
    let randomInt = String(Math.floor(Math.random() * 100) + 1);
    const body=req.body
    console.log("request in backend for post",body)
    if(!body.name || !body.number){
        return res.status(400).json({error:"either of the name of number is missing "})
    }
    if( persons.find(p=>p.name === body.name)){
        return res.status(409).json({error : 'name must be unique'})
    }
    const newPersonObj={
        id:randomInt,
        name:body.name,
        number:body.number
    }
    persons=persons.concat(newPersonObj)
    console.log("after",persons)
   return res.status(204).json(persons)
    
})




const PORT =process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("server is listening on port", PORT);
    
})

