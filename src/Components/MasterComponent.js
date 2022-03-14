import {React,useEffect,useState} from "react";
const axios = require('axios')





function Master(props){

const [FirstName,setFirstName]  = useState("");
const [LastName,setLastName]  = useState("");
const [Name,setName] = useState([]);
const [mode,setmode] = useState("New");   
const [editid,seteditid] = useState(0);


const getApiData = async () => {
   
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     var users =  await fetch("http://localhost:4000/pageload", requestOptions)
        .then(response => response.json())

    console.log(users)
    setName(users)



  };

  useEffect(() => {
    getApiData();
  }, []);
   
    


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

let onSubmit =async()=>{
    var array = Name;
    

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "first_name": FirstName,
  "last_name": LastName
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

var id;

var response = await fetch("http://localhost:4000/register", requestOptions)
  .then(response => response.text())        
  .then(result => id=result)
  .catch(error => console.log('error', error));

  array.push({_id:id,first_name:FirstName,last_name:LastName})


    setName(array)
    setFirstName("")
    setLastName("");
    //console.log(Name)
}

let ondelete=async(Id)=>{

    var array=Name;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      var response = await fetch("http://localhost:4000/delete/"+Id, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    array = array.filter(x => {
        return x._id != Id;
      })
    console.log(array)
    setName(array)
}

let onedit=(Id)=>{

    var array=Name;
    
    array = array.filter(x => {
        return x._id == Id;
      })
    console.log(array)
    setFirstName(array[0].first_name)
    setLastName(array[0].last_name)
    seteditid(array[0]._id)
    setmode("Edit")
}

let onEditSubmit=async()=>{
    var array = Name;
    //array[editid].FirstName=FirstName
    //array[editid].LastName=LastName
    console.log(array,editid)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "first_name": FirstName,
      "last_name": LastName
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    var response = await fetch("http://localhost:4000/update/"+editid, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));


    debugger;
    array = array.forEach(element => {
        if(element._id == editid)
        {
            element.first_name=FirstName
            element.last_name=LastName
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
        :<button className="fleft" style={{marginLeft:"23px"}} type="button" id={editid} onClick={onEditSubmit}>Edit</button>}
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
                <tr><td>{n.first_name}</td><td>{n.last_name}</td><td><button className="btn btn-default btn-sm yellow" onClick={()=>onedit(n._id)}><span class="glyphicon glyphicon-pencil"></span> Edit</button></td><td><button className="btn btn-default btn-sm red" onClick={()=>ondelete(n._id)}><span class="glyphicon glyphicon-trash"></span> Delete</button></td></tr>
            )
        })}
        </tbody>    
        </table> 
    </div>)
}

export default Master;