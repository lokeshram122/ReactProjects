import {React,useEffect,useState} from "react";


function Master(props){

const [FirstName,setFirstName]  = useState("");
const [LastName,setLastName]  = useState("");
const [Name,setName] = useState([]);
const [mode,setmode] = useState("New");   
const [editid,seteditid] = useState(0);


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

let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

let onSubmit =()=>{
    var array = Name;
    array.push({ID:guid(),FirstName:FirstName,LastName:LastName})
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
    seteditid(array[0].ID)
    setmode("Edit")
}

let onEditSubmit=()=>{
    var array = Name;
    //array[editid].FirstName=FirstName
    //array[editid].LastName=LastName
    console.log(array,editid)
    debugger;
    array = array.forEach(element => {
        if(element.ID == editid)
        {
            element.FirstName=FirstName
            element.LastName=LastName
        }
    });
    console.log(array)
    //setName(array)
    // setName(array)
    setFirstName("")
    setLastName("");
    //console.log(Name)
    setmode("New")
}




return (<div>
        <div className="w100 fleft mt10 ml10">
        <span className="fleft mr10">First Name</span><input className="fleft" type="text" name="FirstName" value={FirstName} onChange={(e)=>{onclickEvents(e)}}></input>
        </div>
        <div className="w100 fleft mt10 ml10">
        <span className="fleft mr10">Last Name</span><input className="fleft" type="text" name="LastName" value={LastName} onChange={(e)=>{onclickEvents(e)}}></input>
        </div>
        <div className="fleft w100 mt10 ml190">
        {mode=="New"?<button className="fleft" type="button" onClick={onSubmit}>Submit</button>
        :<button className="fleft" type="button" id={editid} onClick={onEditSubmit}>Edit</button>}
        </div>
        <table>
        <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Edit</th>
                <th>Delete</th>
        </tr>
        <tbody>
        {Name.map((n)=>{
            return(
                <tr><td>{n.FirstName}</td><td>{n.LastName}</td><td><button className="btn btn-default btn-sm yellow" onClick={()=>onedit(n.ID)}><span class="glyphicon glyphicon-pencil"></span> Edit</button></td><td><button className="btn btn-default btn-sm red" onClick={()=>ondelete(n.ID)}><span class="glyphicon glyphicon-trash"></span> Delete</button></td></tr>
            )
        })}
        </tbody>    
        </table> 
    </div>)
}

export default Master;