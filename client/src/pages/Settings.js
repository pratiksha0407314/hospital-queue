import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./setting.css";

export default function Setting(){

const navigate = useNavigate();

const [queueLimit,setQueueLimit]=useState(20);
const [consultTime,setConsultTime]=useState(5);
const [emergency,setEmergency]=useState(true);
const [notifications,setNotifications]=useState(true);
const [autoRefresh,setAutoRefresh]=useState(true);
const [breakTime,setBreakTime]=useState(15);

function resetSystem(){

localStorage.removeItem("patients");

alert("Queue system reset");

}

return(

<div className="settingPage">

<button className="backBtn"
onClick={()=>navigate("/")}>
⬅ Back
</button>

<h1 className="title">Hospital Settings</h1>

<div className="settingBox">

<label>Queue Limit</label>
<input
type="number"
value={queueLimit}
onChange={(e)=>setQueueLimit(e.target.value)}
/>

<label>Consultation Time (minutes)</label>
<input
type="number"
value={consultTime}
onChange={(e)=>setConsultTime(e.target.value)}
/>

<label>Doctor Break Time (minutes)</label>
<input
type="number"
value={breakTime}
onChange={(e)=>setBreakTime(e.target.value)}
/>

<label>Emergency Priority</label>
<select
value={emergency}
onChange={(e)=>setEmergency(e.target.value)}>
<option>true</option>
<option>false</option>
</select>

<label>Enable Notifications</label>
<select
value={notifications}
onChange={(e)=>setNotifications(e.target.value)}>
<option>true</option>
<option>false</option>
</select>

<label>Auto Queue Refresh</label>
<select
value={autoRefresh}
onChange={(e)=>setAutoRefresh(e.target.value)}>
<option>enabled</option>
<option>disable</option>
</select>

<button className="resetBtn"
onClick={resetSystem}>
Reset Queue System
</button>

</div>

</div>

)

}