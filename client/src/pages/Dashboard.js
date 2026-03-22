import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard(){

const navigate = useNavigate();
const [patients,setPatients] = useState([]);

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("patients")) || [];
setPatients(data);

},[]);

const total = patients.length;
const emergency = patients.filter(p=>p.emergency).length;
const waiting = patients.filter(p=>p.status==="Waiting").length;
const completed = patients.filter(p=>p.status==="Completed").length;

const doctorLoad = {};

patients.forEach(p=>{
doctorLoad[p.doctor] = (doctorLoad[p.doctor] || 0) + 1;
});

const nextPatient = patients[0];

return(

<div className="dashboardPage">

<button className="backBtn" onClick={()=>navigate("/")}>⬅ Back</button>

<h1 className="title">Hospital Admin Dashboard</h1>

{/* STATISTICS */}

<div className="statsGrid">

<div className="statCard">
<h2>{total}</h2>
<p>Total Patients</p>
</div>

<div className="statCard emergency">
<h2>{emergency}</h2>
<p>Emergency</p>
</div>

<div className="statCard">
<h2>{waiting}</h2>
<p>Waiting</p>
</div>

<div className="statCard">
<h2>{completed}</h2>
<p>Completed</p>
</div>

</div>

{/* NEXT PATIENT */}

<div className="sectionCard">

<h2>Next Patient in Queue</h2>

{nextPatient ?

<div className="nextPatientBox">

<p><b>Token:</b> {nextPatient.token}</p>
<p><b>Name:</b> {nextPatient.name}</p>
<p><b>Doctor:</b> {nextPatient.doctor}</p>

</div>

:

<p>No Patients in Queue</p>

}

</div>

{/* DOCTOR LOAD */}

<div className="sectionCard">

<h2>Doctor Load</h2>

<div className="doctorGrid">

{Object.keys(doctorLoad).map((doc,i)=>{

const count = doctorLoad[doc];

return(

<div key={i} className={count>8 ? "doctorCard overloaded":"doctorCard"}>

<h3>{doc}</h3>

<p>{count} Patients</p>

{count>8 && <span className="alert">⚠ Overloaded</span>}

</div>

)

})}

</div>

</div>

{/* EMERGENCY PATIENTS */}

<div className="sectionCard">

<h2>Emergency Patients</h2>

<div className="emergencyGrid">

{patients.filter(p=>p.emergency).map((p,i)=>(

<div key={i} className="emergencyCard">

<p>{p.token}</p>
<p>{p.name}</p>

</div>

))}

</div>

</div>

{/* RECENT PATIENTS */}

<div className="sectionCard">

<h2>Recent Registrations</h2>

{patients.slice(-5).reverse().map((p,i)=>(

<p key={i}>{p.token} - {p.name}</p>

))}

</div>

</div>

)
}