import {React,useEffect,useState} from "react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ReactTooltip from 'react-tooltip';


const axios = require('axios')





function Master(props){

const [FirstName,setFirstName]  = useState("");
const [LastName,setLastName]  = useState("");
const [gender,setgender]  = useState("Male");
const [country,setcountry]  = useState("");
const [region,setregion]  = useState("");
const [Name,setName] = useState([]);
const [mode,setmode] = useState("New");   
const [editid,seteditid] = useState(0);


const getApiData = async () => {
   
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      debugger;
      
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



let onSubmit =async()=>{

if(FirstName!=""&&LastName!=""&&country!=""&&region!="")
{
    var array = Name;
    

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "first_name": FirstName,
  "last_name": LastName,
  "gender":gender,
  "address":{
      "country":country,
      "region":region
  }
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

  array.push({_id:id,first_name:FirstName,last_name:LastName,gender:gender,address:{
      country:country,
      region:region
  }})


    setName(array)
    setFirstName("")
    setLastName("");
}


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
    setgender(array[0].gender)
    setcountry(array[0].address.country)
    setregion(array[0].address.region)
    seteditid(array[0]._id)
    setmode("Edit")
}

let onEditSubmit=async()=>{

    if(FirstName!=""&&LastName!=""&&country!=""&&region!="")
    {
        var array = Name;
        //array[editid].FirstName=FirstName
        //array[editid].LastName=LastName
        console.log(array,editid)
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "first_name": FirstName,
          "last_name": LastName,
          "gender":gender,
          "address":{
            "country":country,
            "region":region
        }
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
                element.gender=gender
                element.address.country = country
                element.address.region = region
            }
        });
        console.log(array)
        //setName(array)
        // setName(array)
        
        //console.log(Name)
        
    }
    setFirstName("")
    setLastName("");
    setgender("Male")
    setcountry("")
    setregion("")
    setmode("New")
}




return (<div className="w50 fleft">
        <div className="w100 fleft mt10">
        <span className="fleft" >First Name :</span>
        <input className="fright"  type="text" name="FirstName" value={FirstName} onChange={(e)=>{onclickEvents(e)}}></input>
        </div>
        <div className="w100 fleft mt10" >
        <span className="fleft">Last Name :</span><input className="fright"  type="text" name="LastName" value={LastName} onChange={(e)=>{onclickEvents(e)}}></input>
        </div>
        <div className="w100 fleft mt10" >
        <span className="fleft" >Gender :</span>
        <input className="fright" type="radio" value="Other" name="gender" checked={gender=="Other"}  onChange={(e)=>setgender(e.target.value)}/>   <span className="fright mr10 ml10" >  Other </span>
        <input className="fright" type="radio" value="Female" name="gender" checked={gender=="Female"}  onChange={(e)=>setgender(e.target.value)}/> <span className="fright ml10 mr10" >  Female </span>
         <input className="fright"  type="radio" value="Male" name="gender" checked={gender=="Male"}  onChange={(e)=>setgender(e.target.value)} /> <span className="fright ml10 mr10">  Male </span>
        </div>
        <div className="w100 fleft mt10">
        <span  className="fleft">Country :</span><CountryDropdown 
          className="fright"
          value={country}
          onChange={(val) => setcountry(val)} />
        </div>
        <div className="w100 fleft mt10">
        <span className="fleft" >Region :</span><RegionDropdown 
         className="fright"
          country={country}
          value={region}
          onChange={(val) => setregion(val)} />
        </div>
        <div className="w100 fleft mt10">
        {mode=="New"?<button className="fright" type="button" onClick={onSubmit}>Submit</button>
        :<button className="fright" type="button" id={editid} onClick={onEditSubmit}>Edit</button>}
        </div>
        <table>
        <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Edit</th>
                <th>Delete</th>
        </tr>
        <tbody>
        {Name.map((n)=>{
            return(
                <tr><td>{n.first_name}</td><td>{n.last_name}</td><td>{n.gender}</td>
                <td data-tip={n.address.region}>{n.address.country}</td><td><button className="btn btn-default btn-sm yellow" onClick={()=>onedit(n._id)}><span class="glyphicon glyphicon-pencil"></span> Edit</button></td><td><button className="btn btn-default btn-sm red" onClick={()=>ondelete(n._id)}><span class="glyphicon glyphicon-trash"></span> Delete</button></td> <ReactTooltip /></tr>
            )
        })}
       
        </tbody>    
        </table> 
        
    </div>)
}

export default Master;