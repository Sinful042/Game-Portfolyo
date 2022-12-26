const express = require("express")
const User = require("../Modules/user")
const games=require("../Modules/games");
const Joi = require('joi');
const nodemailer = require('nodemailer');


const router=express.Router();




const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    authority: Joi.string().required(),
  });


  router.post('/register', (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const Newuser = new User({
      email: req.body.email,
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      password: req.body.password,
      authority: req.body.authority,
    });
    Newuser.save();
    res.json(Newuser);
  });


  
router.post("/login",(req,res)=>{
    const {username,password} = req.body;
    User.findOne({username},(err,user)=>{
        if(err){
            return res.send({error:'hata oluştu'})
        }
        if(!user){
            return res.send({error:'Kullanıcı Bulunamadı'})
        }
        else{
            if(password==user.password){
                return res.send(user)
            }
            else{
                return res.send({error:'Parola Hatalı'})
            }
        }
    })
});

const createGameSchema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().required(),
    releasedate: Joi.date().required(),
    description: Joi.string().required(),
  });
  router.post('/Create-Games', (req, res) => {
    const { error } = createGameSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
    const game = new games({
      name: req.body.name,
      type: req.body.type,
      releasedate: req.body.releasedate,
      description: req.body.description,
    });
    game.save();
    res.json(game);
  });  

router.get("/all-games",(req,res)=>{
      const query =games.find()
      query.exec((err, veriler) => {
        if (err) {
          // Bir hata oluştuysa hata mesajını gönderin
          res.send(err);
        } else {
          // Verileri gönderin
          res.json(veriler);
        }
      });
})

router.put("/update-password/:id",(req,res)=>{
    res.send("Updateuser")
})

router.delete('/delete-games/:id',(req,res)=>{
    res.send("Kullanıcı silme işlemi")
})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'omerkillik9@gmail.com',
      pass: 'gxpkbhwepepezcsg'
    }
  });



const jwt = require('jsonwebtoken');

router.post('/reset-password',  async (req, res) => {
   
    const{email}=req.body;
   try{
    const oldUser= await User.findOne({email})
    if(!oldUser){
        return res.send("Kullanıcı Bulunamadı")
    }
    const secret=process.env.JWT_SECRET+oldUser.password;
    const token=jwt.sign({email:oldUser.eMail,id:oldUser.id},secret,{expiresIn:"1h"});
    const link=`http://localhost:5000/portfolyo/reset-password/${oldUser.id}/${token}`;
    console.log(link);
    const mailOptions = {
        from: 'omerkillik9@gmail.com',
        to: email,
        subject: 'Reset PassWord!',
        text: link
      };


    transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
});
   }catch(error){}
    
  });

router.get('/reset-password/:id/:token', async(req,res)=>{
    const{id,token}=req.params;
    console.log(req.params);
    
    const oldUser = await User.findOne({id});
    if(!oldUser){
        return res.json("Kullanıcı Bulunamadı");
    }

    res.send("Reset PassWord is Done")
    
})


module.exports = router;