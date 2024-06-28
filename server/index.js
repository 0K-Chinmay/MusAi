
const mongoose= require('mongoose')
const User = require('./models/user.model')
const bodyParser= require('body-parser')
const express= require('express');
const app=express();
const cors = require('cors');
 app.use(bodyParser.json({limit: "30mb", extended:true}));
 app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))
 app.use(cors({
    origin: '*',
    method:["POST","GET"],
  credentials:true
 }));
 
  const CONNECTION_URL=`mongodb+srv://sekiro:sekiro@sekiro.lu0pyfl.mongodb.net`
 const PORT= 5000;
 mongoose.connect(CONNECTION_URL)
 app.listen(5000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT");
});

app.get('/',(req,res)=>{
    res.json("hello")
})

app.post('/api/register',async (req,res)=>{
    try {
    await User.create({
               secret:req.body.secret,
               playlist:req.body.playlist,
               prompt:req.body.prompt,
               songInfo:req.body.songInfo
        })
        res.json({status:'ok'})
    } catch (error) {
        console.log("dumbfk66"+error)
       res.json({status:'error'})
    } 
})

app.post('/api/playlist',async (req,res)=>{
    try {
       User.find({secret:req.body.secret}).then(function(data){
        res.send(data)
     }) 

    } catch (error) {
        console.log("dumbfk66"+error)
       res.json({status:'error'})
    } 
})

app.post('/api/explore',async (req,res)=>{
    try {
       User.find({}).then(function(data){
        res.send(data)
        
     }) 
    
    } catch (error) {
        console.log("dumbfk66"+error)
       res.json({status:'error'})
    } 
})

app.post('/api/del',async (req,res)=>{
    try {
        User.deleteOne({ prompt:req.body.key }).then((result) => { 
            res.send(result)
        }); 

    } catch (error) {
        console.log("dumbfk66"+error)
       res.json({status:'error'})
    } 
})




