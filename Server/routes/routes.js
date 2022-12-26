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
router.post("/CreateGames",(req,res)=>{
    const game=new games({
      name:req.body.name,
      type:req.body.type,
      releasedate:req.body.releasedate,
      description:req.body.desc,
      
    })
    game.save()
    res.json(game);
});

router.get("/allgames",(req,res)=>{
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

router.put("/updateGames/:id",(req,res)=>{
    res.send("Updateuser")
})

router.delete('/deletegames/:id',(req,res)=>{
    res.send("Kullanıcı silme işlemi")
})

module.exports = router;