import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";

export default function Doctor(){

const navigate = useNavigate();

const [patients,setPatients] = useState([]);
const [doctor,setDoctor] = useState("");

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("patients")) || [];

setPatients(data);

},[]);

/* doctor queue */

const doctorPatients = patients.filter(p=>p.doctor===doctor);

/* mark completed */

function completePatient(index){

const updated = [...patients];

updated[index].status = "Completed";

setPatients(updated);

localStorage.setItem("patients",JSON.stringify(updated));

}

/* remove patient */

function removePatient(index){

const updated = patients.filter((_,i)=>i!==index);

setPatients(updated);

localStorage.setItem("patients",JSON.stringify(updated));

}

/* estimated waiting */

function estimateTime(i){

return i*5;

}

return(

<div className="doctorPage">

<button className="backBtn" onClick={()=>navigate("/")}>⬅ Back</button>

<h1 className="title">Doctor Panel</h1>

{/* DOCTOR SELECT */}

<div className="doctorSelect">

<select onChange={(e)=>setDoctor(e.target.value)}>

<option>Select Doctor</option>

<option>Dr Sharma</option>
<option>Dr Khan</option>
<option>Dr Mehta</option>

</select>

</div>

{/* STATISTICS */}

<div className="statsGrid">

<div className="statCard">
<h2>{doctorPatients.length}</h2>
<p>Total Patients</p>
</div>

<div className="statCard">
<h2>{doctorPatients.filter(p=>p.status==="Waiting").length}</h2>
<p>Waiting</p>
</div>

<div className="statCard">
<h2>{doctorPatients.filter(p=>p.emergency).length}</h2>
<p>Emergency</p>
</div>

</div>

{/* NEXT PATIENT */}

{doctorPatients.length>0 &&

<div className="nextPatient">

<h2>Next Patient</h2>

<p><b>Token:</b> {doctorPatients[0].token}</p>

<p><b>Name:</b> {doctorPatients[0].name}</p>

</div>

}

{/* QUEUE */}

<h2 className="queueTitle">Doctor Queue</h2>

<div className="queueGrid">

{doctorPatients.map((p,i)=>(

<div key={i} className={p.emergency ? "patientCard emergency":"patientCard"}>

<h2>{p.token}</h2>

<p>{p.name}</p>

<p>{p.age}</p>

<p>⏱ {estimateTime(i)} min</p>

<p>Status: {p.status}</p>

<div className="btnRow">

<button onClick={()=>completePatient(i)}>Complete</button>

<button onClick={()=>removePatient(i)}>Remove</button>

</div>

</div>

))}

</div>

</div>

)

}