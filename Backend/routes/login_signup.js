const express=require('express');
const path=require('path')
const router=express.Router();

router.get('/signup',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','../','frontend','index.html'));
})
// console.log(path.join(__dirname,'../','../','frontend','index.html'));

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','../','frontend','index.html'));
})

// exports.module=router;
module.exports=router;

