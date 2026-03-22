import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./help.css";

export default function Help(){

const navigate = useNavigate();

const [question,setQuestion]=useState("");
const [message,setMessage]=useState("");

function ask(){

if(question==="") return;

setMessage("Question submitted. Please wait, hospital support will respond.");

setQuestion("");

}

return(

<div className="helpPage">

<button className="backBtn"
onClick={()=>navigate("/")}>
⬅ Back
</button>

<h1 className="title">Help Center</h1>

<div className="helpBox">

<input
placeholder="Type your question..."
value={question}
onChange={(e)=>setQuestion(e.target.value)}
/>

<button onClick={ask}>
Ask Question
</button>

{message &&

<p className="msg">
{message}
</p>

}

</div>

<div className="contactBox">

<h3>Contact Hospital Support</h3>

<p>📞 Phone: +91 9876543210</p>
<p>📧 Email: support@hospital.com</p>
<p>🏥 Address: City Hospital, Main Road</p>

</div>

</div>

)

}