const express=require("express")
const ConnectDB=require("./config/DB");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

//const connectDB = require('./config/DB');


//require("dotenv").config();
//const{registerUser,loginUser}=require("./Controllers/UserController");
const UserRoutes=require("./Routes/UserRoutes");
const movieRoutes=require("./Routes/movieRoutes");
const reviewRoutes=require("./Routes/reviewRoutes.js");

const app=express();
const PORT = process.env.PORT || 4000;

ConnectDB();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/user",UserRoutes)
app.use("/api/movies",movieRoutes);
app.use("/api/reviews",reviewRoutes)
app.get('/',(req,res)=>{
    res.send("hello world")
})

//app.listen(/*process.env.*/PORT,()=>{
  //  console.log("listening to port"+PORT)
//})
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});