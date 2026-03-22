import TopBar from "../components/topbar";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

export default function Home(){

const navigate = useNavigate();

return(

<div className="page">

<TopBar/>

<div className="menu">

<div className="menuItem" onClick={()=>navigate("/dashboard")}>
<div className="icon">📊</div>
<p>Dashboard</p>
</div>

<div className="menuItem" onClick={()=>navigate("/patient")}>
<div className="icon">🧑</div>
<p>Patient</p>
</div>

<div className="menuItem" onClick={()=>navigate("/doctor")}>
<div className="icon">👨‍⚕</div>
<p>Doctor</p>
</div>

<div className="menuItem" onClick={()=>navigate("/queue")}>
<div className="icon">🎟</div>
<p>Live Queue</p>
</div>

</div>

</div>

);

}