
const express = require("express");

const mongoose = require('mongoose');

const User=require("../models/userModel");

const router= express.Router();
//create

router.post("/", async(req,res)=>{

    const {name, email, age}=req.body;
   // const User=require("../models/userModel");
    try{
        const userData=await User.create({
            name:name,
            email:email,
            age:age
        });
        res.status(201).json(userData);
    } catch(error){ 
        console.log(error); 
        res.send(400).json({error:error.message})       
    } 
 
})  


//get

router.get("/",async(req,res)=>{

    try{
const showAll=await User.find()
 
res.status(200).json(showAll);
} catch(error){
    console.log(error);
    res.send(500).json({error:error.message})
}
});

//get single


router.get("/:id",async(req,res)=>{
    const {id}= req.params;

    try{
const showSingleUser=await User.findById({_id : id})

res.status(200).json(showSingleUser);
} catch(error){
    console.log(error);
    res.send(500).json({error:error.message})
}
});



 //delete

 router.delete("/:id",async(req,res)=>{
    const {id}= req.params;

    try{
const showSingleUser=await User.findByIdAndDelete({_id : id})

res.status(200).json(showSingleUser);
} catch(error){ 
    console.log(error);
    res.send(500).json({error:error.message})
}
});


//update

router.patch("/:id",async(req,res)=>{
    const {id}= req.params;
    const {name,email,age}=req.body;

    try{
const updateUser=await User.findByIdAndUpdate(id, req.body, {new:true,});

res.status(200).json(updateUser);
} catch(error){ 
    console.log(error);
    res.send(500).json({error:error.message})
}
});

 

module.exports=router; 