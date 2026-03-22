import React,{useState} from "react";

function HelpCenter({goBack}){

const [q,setQ]=useState("")

return(

<div className="page">

<button className="back-btn" onClick={goBack}>
⬅ Back
</button>

<h2>Help Center</h2>

<input
placeholder="Type your question..."
value={q}
onChange={(e)=>setQ(e.target.value)}
/>

</div>

)

}

export default HelpCenter