const mongoose = require('mongoose')
const objectId = mongoose.schema.Type.objectId;


const blogSchema=new mongoose.Schema(
    {
title:{
  type:String ,
   required:true,
   trim:true
},
authorId:{
  type:objectId,
  ref:"Author",
},
tags:Array,
category:String,
subcategory:Array,
isDeleted:{
    type:Boolean,
    default:true,}
}