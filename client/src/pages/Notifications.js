import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

export default function Notification(){

const navigate = useNavigate();

const [notifications,setNotifications] = useState([]);

useEffect(()=>{

const patients = JSON.parse(localStorage.getItem("patients")) || [];

let list = [];

list.push({type:"info",msg:"Hospital Queue System Active"});
list.push({type:"info",msg:"All services running normally"});

/* emergency alerts */

patients.filter(p=>p.emergency).forEach(p=>{
list.push({
type:"emergency",
msg:`Emergency patient ${p.name} (${p.token}) added`
});
});

/* long queue */

if(patients.length>10){

list.push({
type:"warning",
msg:`Queue length high (${patients.length} patients)`
});

}

setNotifications(list);

},[]);

function remove(i){
setNotifications(notifications.filter((_,index)=>index!==i));
}

return(

<div className="notifyPage">

<button className="backBtn"
onClick={()=>navigate("/")}>
⬅ Back
</button>

<h1 className="title">Hospital Notifications</h1>

<div className="notifyContainer">

{notifications.map((n,i)=>(

<div key={i}
className={`notifyCard ${n.type}`}>

<span>{n.msg}</span>

<button onClick={()=>remove(i)}>
Dismiss
</button>

</div>

))}

</div>

</div>

)

}