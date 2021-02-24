const express = require("express");
const app = express();
const expressHbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, "templates")));
app.set("view engine", ".hbs");
app.engine(".hbs", expressHbs({defaultLayout: false}));
app.set("views", path.join(__dirname, "templates"));


app.get("/register", (req, res) => {
    res.render("register")
});
app.post("/register", (req, res) =>{
    fs.readFile(path.join(__dirname, "database", "users.txt"), (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        const dataBaseUsers = JSON.parse(data.toString());
        const FindUserData = dataBaseUsers.find(user=> user.email === req.body.email);

        if(!FindUserData){
            dataBaseUsers.push(req.body);
            fs.writeFile(path.join(__dirname, "database","users.txt"), JSON.stringify(dataBaseUsers), err1 => {
                if(err1){
                    console.log(err1);
                }
            });
            res.redirect("/users");
            return;
        }
        res.render("error", {status:true})
    });

} );

app.get("/users", (req, res) => {
    fs.readFile(path.join(__dirname,"database" ,"users.txt"), (err, data) => {
        if (err){
            console.log(err);
            return;
        }
        const Users= JSON.parse(data.toString());
        res.render("users", {user: Users})
    })
})

app.get("/error", (req, res) => {
    res.render("error")
})

app.get("/login", (req, res) => {
    res.render("login")
});
app.post("/login", (req, res) => {

    fs.readFile(path.join(__dirname, "database","users.txt"), (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        const userData = JSON.parse(data.toString());
        const validation = userData.findIndex(user=> user.email === req.body.email&& user.password === req.body.password);
        if (validation !== -1){
            res.redirect(`/users/${validation}`)
            return;
        }
        res.render("error", {status:false})

    })
});

app.get("/users/:usersId", (req, res) => {
    const {usersId} = req.params;

    fs.readFile(path.join(__dirname, "database","users.txt"), (err, data) => {
        if(err){
            console.log(err);
            return;
        }
        const usersData = JSON.parse(data.toString());
        res.json(usersData[usersId])
    })
} )




app.listen(5000, ()=>{
    console.log("Server launched")
});
