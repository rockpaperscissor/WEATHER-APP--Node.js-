const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const weathedata = require("../utils/weatherdata");
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
app.set("view engine","hbs");//hbs as view engine,handle bar
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));
app.get("/",(req,res)=> {
    res.render("index",{title:"weather app"});

});


app.listen(port,()=>{
    console.log("server running at port",port);
});
app.get("/weather",(req,res)=>{//server side api call
    if(!req.query.address){
       return  res.send("address is required");
    }
    // res.send("this is current ")
    weathedata(req.query.address,(error,result)=>{
        if(error){
            return res.send(error);
        }
        res.send(result);

    })
});
app.get("*",(req,res)=>{
    res.render("404",{title:"404 error page"});

})
//BUILD UI ,BEFORE ANOTHER API HANDLER,IF A  API DOES NOT EXIST
