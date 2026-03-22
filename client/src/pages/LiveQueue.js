import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./livequeue.css";

export default function LiveQueue(){

const navigate = useNavigate();

const [patients,setPatients] = useState([]);

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("patients")) || [];

setPatients(data);

},[]);

/* statistics */

const total = patients.length;

const emergency = patients.filter(p=>p.emergency).length;

const waiting = patients.filter(p=>p.status==="Waiting").length;

/* estimate time */

function estimateTime(i){

return i*5;

}

/* next patient */

const nextPatient = patients[0];

return(

<div className="queuePage">

<button className="backBtn" onClick={()=>navigate("/")}>⬅ Back</button>

<h1 className="title">Hospital Live Queue</h1>

{/* STATS */}

<div className="statsGrid">

<div className="statCard">
<h2>{total}</h2>
<p>Total</p>
</div>

<div className="statCard">
<h2>{waiting}</h2>
<p>Waiting</p>
</div>

<div className="statCard emergency">
<h2>{emergency}</h2>
<p>Emergency</p>
</div>

</div>

{/* NOW SERVING */}

<div className="nowServing">

<h2>Now Serving</h2>

{nextPatient ?

<div className="servingCard">

<h1>{nextPatient.token}</h1>

<p>{nextPatient.name}</p>

<p>{nextPatient.doctor}</p>

</div>

:

<p>No Patient</p>

}

</div>

{/* QUEUE */}

<h2 className="queueTitle">Live Queue</h2>

<div className="queueGrid">

{patients.map((p,i)=>(

<div key={i} className={p.emergency ? "queueCard emergency":"queueCard"}>

<div className="position">#{i+1}</div>

<h2>{p.token}</h2>

<p>{p.name}</p>

<p>{p.doctor}</p>

<p>⏱ {estimateTime(i)} min</p>

</div>

))}

</div>

</div>

)

}