const express=require('express')
const app=express()
const bodyParser=require('body-parser')//allows to grab elements from frontend also parameters within the url
const mongoose=require('mongoose')
const Book=require('./book.model')
require('dotenv').config()
app.use(express.json())

//connecting to the database and error handling
mongoose.connect(process.env.DBCONNECTION)
const db=mongoose.connection
db.on("error",()=>console.log('error connecting to server'))
db.once("open",()=>console.log("connected to the database successfully"))


app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${process.env.PORT}`)
})


app.get('/',(req,res)=>{
    res.send("happy")
})

app.get('/book',(req,res)=>{
    Book.find()
    .then(books=>{
        res.json(books)
    })
    .catch(err=>{
        res.json(err)
    })
})

//async await to get one book
app.get('/book/:title', async(req,res)=>{
    try{
        const book=await Book.findOne({"title":req.params.title})
        res.json(book)
    }
    catch(err){
        res.json(err)
    }
})



//adding a book
//Using body-parser in a Node.js and Express application allows you to parse incoming request bodies in a middleware before your handlers. This can be especially useful when dealing with POST requests, where you might need to access form data or JSON payloads.
app.use(bodyParser.json())
//app.use(bodyParser.json()): This line tells your app to use body-parser middleware to parse JSON-encoded bodies.
app.use(bodyParser.urlencoded({
    extended:true
}))
// app.use(bodyParser.urlencoded({ extended: true })): This line tells your app to use body-parser middleware to parse URL-encoded bodies. The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format, which is a more powerful alternative to extended: false.
 
app.post('/book', async (req,res)=>{
    //create a book that refferences a new book schema
    const book=new Book()
    book.title=req.body.title
    book.author=req.body.author
    book.category=req.body.category
    
    // book.save()
    // .then(result=>res.json(result))
    // .catch(err=>res.json(err))

    try{
        await book.save()
        res.json(book)
    }
    catch (err){
        res.json(err)
    }
})

//deleting a book
app.delete('/book/:id',(req,res)=>{
    Book.findOneAndDelete({"_id" : req.params.id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//updating a book
//the findOneAndUpdate(findBy,UpdateWhat,Option)
//options: An optional object to configure the behavior of the findOneAndUpdate operation. Common options include:
// new: If true, the method returns the updated document instead of the original. Default is false.
// upsert: If true, creates a new document if no document matches the filter criteria. Default is false.
// runValidators: If true, validates the update against the schema. Default is false.
app.put('/book/:id',(req,res)=>{
    Book.findOneAndUpdate({'_id':req.params.id},//findBy
        {$set: {'title':req.body.title}},//Update what
        {upsert:true})//Option
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})