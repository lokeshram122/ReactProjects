import React from "react";

export class Main extends React.Component{

    constructor(){
        super()
        this.state={
            count :0,
            name:"",
            names:["lokesh","mamtha"],
            list:""    
        }
        
    }



    change(){
        this.setState({count:this.state.count+1,name:"lokesh ram" },
        ()=>{
            this.setState({count:this.state.count+5,name:this.state.name.replace("ram","lnq")})
        })

        var lists="";
        console.log(this.state.name)
        var newvar = this.state.names;
        debugger;
        newvar.map(name=>{
            lists=lists+`<li>${name}</li>`
        })

        this.setState({list:lists})
    }

    render(){
        return(<div>Hello World {this.state.count} {this.state.name}
        <button onClick={()=>this.change()}>click me</button>
        <ol>{this.state.names.map(
            name=><li>{name}</li>
        )}</ol>
        </div>)
    }
}
