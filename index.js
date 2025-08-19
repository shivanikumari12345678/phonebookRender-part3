import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import Phonebook from './models/phoneBook.js'

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
let persons=[]


morgan.token('body',(req,res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :body'))

app.get('/',(req,res) => {
  res.send('<h1>hello world<h1>')
})

app.get('/api/persons',(req,res,next) => {
  Phonebook.find({}).then(result => {
    if(result) return res.json(result)
    else{return res.status(404).json({ error:'person not found' })}
  })
    .catch(e => next(e))
})

app.get('/info',(req,res,next) => {
  let count=0
  Phonebook.find({}).then(result => {
    count=result.length
    const now=new Date()
    const date=now.toString()
    res.send(`<div>
            <p>Phonebook has info for ${count} persons</p>
            <p>${date}</p>
        </div>`
    )
  })
    .catch(e => next(e))

})

app.get('/api/persons/:id',(req,res,next) => {
  const id=req.params.id
  Phonebook.findById(id)
    .then((result) => {
      if(!result) return res.status(404).end()
      else{ return res.json(result)}
    })
    .catch(e => next(e))
})

app.delete('/api/persons/:id',(req,res,next) => {
  const id=req.params.id
  Phonebook.findByIdAndDelete(id)
    .then(() => res.status(200).end())
    .catch((e) => next(e))
})


app.post('/api/persons',(req,res,next) => {

  const body=req.body
  if(!body.name || !body.number){
    return res.status(400).json({ error:'either of the name of number is missing ' })
  }

  const phonebook=new Phonebook({
    name:body.name,
    number:body.number
  })

  phonebook.save()
    .then((result) => {
      console.log('saved new phonebook')
      return res.status(200).json(result)
    })
    .catch((e) => next(e))

})

app.put('/api/persons/:id',(req,res,next) => {
  const personToUpdate=req.body
  const id=req.params.id
  Phonebook.findByIdAndUpdate(id,personToUpdate,{ new:true,runValidators:true,context:true })
    .then((result) => {return res.status(200).json(result)})
    .catch((e) => next(e))
})


const errorHandler=(e,req,res,next) => {
  console.log(e.message)
  if(e.name === 'CastError'){
    return res.status(400).send({ error:'malformated id' })
  }else if(e.name === 'ValidationError'){
    return res.status(400).send({ error:e.message })
  }
  next(e)
}
app.use(errorHandler)

app.use((e,req,res,next) => {
  return res.status(500).json({ error:'something went wrong' })
})




const PORT =process.env.PORT || 3000
app.listen(PORT,() => {
  console.log('server is listening on port', PORT)

})

