import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./patient.css";

export default function Patient() {

const navigate = useNavigate();

const [patients,setPatients] = useState([]);

const [name,setName] = useState("");
const [age,setAge] = useState("");
const [gender,setGender] = useState("");
const [phone,setPhone] = useState("");
const [doctor,setDoctor] = useState("");

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("patients")) || [];
setPatients(data);

},[]);

/* Generate token */

function addPatient(emergency=false){

if(!name || !age || !doctor){
alert("Please fill required fields");
return;
}

const tokenPrefix = emergency ? "E" : "T";

const newPatient = {

token: tokenPrefix + (patients.length + 1),
name,
age,
gender,
phone,
doctor,
status:"Waiting",
emergency

};

const updated = [...patients,newPatient];

setPatients(updated);

localStorage.setItem("patients",JSON.stringify(updated));

/* clear form */

setName("");
setAge("");
setGender("");
setPhone("");
setDoctor("");

}

/* delete token */

function deleteToken(index){

const updated = patients.filter((_,i)=>i!==index);

setPatients(updated);

localStorage.setItem("patients",JSON.stringify(updated));

}

return(

<div className="patientPage">

<button className="backBtn"
onClick={()=>navigate("/")}>
⬅ Back
</button>

<h1 className="title">Patient Registration</h1>

{/* FORM */}

<div className="formSection">

<input
placeholder="Patient Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Age"
value={age}
onChange={(e)=>setAge(e.target.value)}
/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}>
<option>Gender</option>
<option>Male</option>
<option>Female</option>
</select>

<input
placeholder="Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<select
value={doctor}
onChange={(e)=>setDoctor(e.target.value)}>
<option>Select Doctor</option>
<option>Dr Sharma</option>
<option>Dr Khan</option>
<option>Dr Mehta</option>
</select>

</div>

<div className="btnRow">

<button
className="normalBtn"
onClick={()=>addPatient(false)}>
Generate Token
</button>

<button
className="emergencyBtn"
onClick={()=>addPatient(true)}>
Emergency Token
</button>

</div>

{/* QUEUE */}

<h2 className="queueTitle">Live Queue</h2>

<div className="queueContainer">

{patients.map((p,i)=>(

<div
key={i}
className={p.emergency ? "tokenCard emergency" : "tokenCard"}>

<h2>{p.token}</h2>

<p><b>Name:</b> {p.name}</p>

<p><b>Doctor:</b> {p.doctor}</p>

<p><b>Status:</b> {p.status}</p>

<button
className="deleteBtn"
onClick={()=>deleteToken(i)}>
Delete
</button>

</div>

))}

</div>

</div>

)

}