const port =3000;
const express=require("express")
const app=express();
let path=require("path")
const methodOverride=require("method-override")
const { v4: uuidv4 } = require('uuid');

let posts=[
    {
        id:uuidv4(),
        username:"shraddha",
        post:"she loves coding"
    },
    {
        id:uuidv4(),
        username:"vivek",
        post:"Happy coding"
    },
    {
        id:uuidv4(),
        username:"naman",
        post:"he loves coding"
    },
    {
        id:uuidv4(),
        username:"ranjit",
        post:"no coding"
    }
]
app.set("view engine","ejs")
app.set("views",path.join(__dirname, "views"))

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("server working well")
})
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("addpost.ejs",{posts})
})
app.post("/posts",(req,res)=>{
    let {username,post}=req.body
    const id=uuidv4();
    posts.push({id,username, post})
    res.redirect("http://localhost:3000/posts")
})

app.get("/posts/:id",(req,res)=>{
    let{ id} =req.params
    let post=posts.find((p)=>p.id==id)
    res.render("post_detail.ejs",{post})
})

app.patch("/posts/:id",(req,res)=>{
        let {id}=req.params
        let new_post=req.body.post
        let post=posts.find((p)=>p.id==id)
        post.post=new_post
        res.redirect("http://localhost:3000/posts")
    })

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params
   posts=posts.filter((p)=>p.id !== id)
    res.redirect("http://localhost:3000/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let{ id} =req.params
    let post=posts.find((p)=>p.id==id)
    res.render("update.ejs",{post})
})

app.get("/data",(req,res)=>{
    res.redirect("/data/redirected?data=Welcome to this page !!!")
})

app.get("/data/redirected",(req,res)=>{
    let {data}= req.query
    res.send(`${data} redirected from data `)
})

app.listen(port, ()=>{
    console.log("server started on port ",port)
})

