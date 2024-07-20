const mongoose=require('mongoose')
// const Schema=mongoose.Schema

const { Schema } = mongoose;

let BookSchema = new Schema({
    keywords:Array,
    published:Boolean,
    title:{
        type:String,
        required:true,
        unique:true
    },
    
    created:{
        type : Date,
        default : Date.now
    },
   author:String,
    // author:{
    //     type:Schema.ObjectId,
    //     ref:'Author'
    // },
    //Embedded sub-documents
    detail:{
        modelNumber:Number,
        hardcover:Boolean,
        reviews:Number,
        rank:Number
    },
    category:String
})

// for the schema to be used in other files create and export a model

module.exports=mongoose.model('Book',BookSchema)//a collection named books is automatically created in the database


