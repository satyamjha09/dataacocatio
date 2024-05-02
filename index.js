const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");




app.use(express.json());


app.get('/' ,  (req, res) => {
    res.send("Hello World");
})


app.get('/create' , async (req, res) => {

    let user = await userModel.create({
        username: 'satyam',
        email: "satyamjha@gmail.com",
        age: 22
    });

    res.send(user);
})

app.get("/post/create" , async (req, res) =>  {
    let post = await postModel.create({
        postdata: "Hello saare log kaise ho",
        user: "663258780c73d151a4981ac3"
    })

    let user = await userModel.findOne({_id: "663258780c73d151a4981ac3" });
    user.posts.push(post._id);
    await user.save();
    res.send({post , user});

})


app.listen(3000);