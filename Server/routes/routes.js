const express = require("express")
const User = require("../Modules/user")
const games=require("../Modules/games");

const router=express.Router();


router.post("/register",(req,res)=>{
    
    const Newuser=new User({
        email:req.body.email,
        name:req.body.name,
        surname:req.body.surname,
        username:req.body.username,
        password:req.body.password,
        authority:req.body.authority,
    })
    Newuser.save()
    res.json(Newuser);

    
    
});
router.post("/login",(req,res)=>{
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
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
router.post("/CreateGames",(req,res)=>{
    const game=new games({
      name:req.body.name,
      type:req.body.type,
      releasedate:req.body.releasedate,
      description:req.body.description,
      images:req.body.images,
    })
    game.save()
    res.json(game);
});

router.post("/allgames",(req,res)=>{
    res.send(games);
})

router.put("/updateGames/:id",(req,res)=>{
    res.send("Updateuser")
})

router.delete('/deletegames/:id',(req,res)=>{
    res.send("Kullanıcı silme işlemi")
})

module.exports = router;