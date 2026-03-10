const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:8463" } });

app.use(cors());
app.use(express.json());

// Helpers
function getNextToken(emergency, callback) {
  if (emergency) callback(0.5); // emergency priority
  else db.get("SELECT MAX(token) as maxToken FROM patients", (err, row) => callback(row?.maxToken ? row.maxToken + 1 : 1));
}

function authMiddleware(req,res,next){
  const token=req.headers["authorization"]?.split(" ")[1];
  if(!token) return res.status(401).json({error:"Unauthorized"});
  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return res.status(403).json({error:"Forbidden"});
    req.user=user;
    next();
  });
}

// Auth
app.post("/signup",async(req,res)=>{
  const {username,password}=req.body;
  const hash=await bcrypt.hash(password,10);
  db.run("INSERT INTO users (username,password) VALUES (?,?)",[username,hash],function(err){
    if(err) return res.status(500).json({error:err.message});
    res.json({id:this.lastID,username});
  });
});

app.post("/login",(req,res)=>{
  const {username,password}=req.body;
  db.get("SELECT * FROM users WHERE username=? ",username,async(err,user)=>{
    if(!user || !(await bcrypt.compare(password,user.password))) return res.status(401).json({error:"Invalid credentials"});
    const token=jwt.sign({id:user.id,username},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.json({token,username});
  });
});

// Patients
app.get("/patients",authMiddleware,(req,res)=>{
  db.all("SELECT * FROM patients ORDER BY emergency DESC, token ASC",(err,rows)=>res.json(rows));
});

app.post("/patients",authMiddleware,(req,res)=>{
  const {name,emergency,doctor_id}=req.body;
  getNextToken(emergency,(token)=>{
    db.run("INSERT INTO patients (name,token,emergency,doctor_id) VALUES (?,?,?,?)",[name,token,emergency?1:0,doctor_id||null],function(){
      const newPatient={id:this.lastID,name,token,status:"waiting",emergency:emergency?1:0,doctor_id:doctor_id||null};
      io.emit("patientAdded",newPatient);
      res.json(newPatient);
    });
  });
});

app.put("/patients/:id/status",authMiddleware,(req,res)=>{
  const {id}=req.params;
  const {status} = req.body;
  db.run("UPDATE patients SET status=? WHERE id=?",[status,id],function(){
    io.emit("patientUpdated",{id,status});
    res.json({id,status});
  });
});

app.delete("/patients/:id",authMiddleware,(req,res)=>{
  const {id}=req.params;
  db.run("DELETE FROM patients WHERE id=? ",id,function(){
    io.emit("patientRemoved",id);
    res.json({id});
  });
});

// Doctors
app.get("/doctors",authMiddleware,(req,res)=>{
  db.all("SELECT * FROM doctors",(err,rows)=>res.json(rows));
});

app.post("/doctors",authMiddleware,(req,res)=>{
  const {name,specialization}=req.body;
  db.run("INSERT INTO doctors (name,specialization) VALUES (?,?)",[name,specialization],function(){
    const newDoctor={id:this.lastID,name,specialization};
    io.emit("doctorAdded",newDoctor);
    res.json(newDoctor);
  });
});

// Socket
io.on("connection",socket=>console.log("Client connected"));

server.listen(process.env.PORT||5550,()=>console.log("Backend running on 5550"));