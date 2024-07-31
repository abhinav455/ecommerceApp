const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("dotenv").config(); 


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0'; //'127.0.0.1';//'0.0.0.0';//'167.103.21.14';  //'0.0.0.0'; //'10.160.68.155' //-client ip before vpn  '10.160.64.1' //wifi router
const connectDB = require("./config/db");


app.use(cors());  


app.use(morgan("dev")); 
//connect to mongodb async
connectDB();      

//define routes and api middleware with no next()
app.use("/api/payment/confirmpayment", require("./routes/confirmpaymentApi"));
app.use(express.json({extended: false}));
app.use("/api/users", require("./routes/userApi"));
app.use("/api/products", require("./routes/productsApi"));
app.use("/api/auth", require("./routes/authApi"));
app.use("/api/profile", require("./routes/profileApi"));
app.use("/api/cart", require("./routes/cartApi"));
app.use("/api/payment", require("./routes/paymentApi"));


// cors: {
//     origin: ["www.one.com","www.two.com","www.three.com"],
//     default: "www.one.com"
//   }
    
//   app.all('*', function(req, res, next) {
//     const origin = cors.origin.includes(req.header('origin').toLowerCase()) ? req.headers.origin : cors.default;
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//or
//app.use(cors({ origin: ["http://localhost:3000", "https://origin2.com"] }));


app.get("/", (req,res) => {

    console.log(req.socket.remoteAddress);
   // res.setHeader('Access-Control-Allow-Origin', 'www.example.com')
    res.send("My app is up");
});

// app.get('/index.html', function(req, res) {
//     res.sendFile('index.html' , {root: path.join(__dirname, '.')});
//  } 


app.listen(PORT,  HOST, ()=> {
    console.log(`server is listening at port ${PORT}`);
});

