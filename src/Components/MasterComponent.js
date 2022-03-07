import {React,useEffect,useState} from "react";


function Master(props){

const [FirstName,setFirstName]  = useState("");
const [LastName,setLastName]  = useState("");
const [Name,setName] = useState([]);
const [mode,setmode] = useState("New");   


let onclickEvents=(e)=>{
if(e.target.name=="FirstName")
{
    setFirstName(e.target.value)
    //setName({...Name,FirstName:e.target.value})
}
else if(e.target.name == "LastName")
{
    setLastName(e.target.value)
    //setName({...Name,LastName:e.target.value})
}
  
}

let onSubmit =()=>{
    var array = Name;
    array.push({ID:array.length+1,FirstName:FirstName,LastName:LastName})
    setName(array)
    setFirstName("")
    setLastName("");
    console.log(Name)
}

let ondelete=(Id)=>{

    var array=Name;
    array = array.filter(x => {
        return x.ID != Id;
      })
    console.log(array)
    setName(array)
}

let onedit=(Id)=>{

    var array=Name;
    array = array.filter(x => {
        return x.ID == Id;
      })
    console.log(array)
    setFirstName(array[0].FirstName)
    setLastName(array[0].LastName)
    setmode("Edit")
}

let onEditSubmit=()=>{
    var array = Name;
    array.push({ID:array.length+1,FirstName:FirstName,LastName:LastName})
    setName(array)
    setFirstName("")
    setLastName("");
    console.log(Name)
    setmode("New")
}




return (<div>
        <div className="w100 fleft mt10">
        <span className="fleft mr10">First Name</span><input className="fleft" type="text" name="FirstName" value={FirstName} onChange={(e)=>{onclickEvents(e)}}></input>
        </div>
        <div className="w100 fleft mt10">
        <span className="fleft mr10">Last Name</span><input className="fleft" type="text" name="LastName" value={LastName} onChange={(e)=>{onclickEvents(e)}}></input>
        </div>
        <div className="fleft w100 mt10">
        {mode=="New"?<button className="fleft" type="button" onClick={onSubmit}>Submit</button>
        :<button className="fleft" type="button" onClick={onEditSubmit}>Submit</button>}
        </div>
        <table>
        <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Edit</th>
                <th>Delete</th>
        </tr>
        <tbody>
        {Name.map((n)=>{
            return(
                <tr><td>{n.ID}</td><td>{n.FirstName}</td><td>{n.LastName}</td><td><button onClick={()=>ondelete(n.ID)}>Delete</button></td><td><button onClick={()=>onedit(n.ID)}>Edit</button></td></tr>
            )
        })}
        </tbody>    
        </table> 
    </div>)
}

export default Master;