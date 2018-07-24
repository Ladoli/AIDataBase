import React, { Component } from 'react';




class AIInputOption extends Component {

  componentDidMount(){
  }

  render() {
    let inputAttr = {};
    if(!this.props.id){
    } else{
      inputAttr = this.props.id;
    }
    let defVal = "";
    if(!this.props.defaultVal){
    }else{
      defVal = this.props.defaultVal;
    }
    let step = "1";
    if(this.props.step){
      step = "0.01";
    }

    return (
      <div className="inputAI">
        <p style={{display: "inline-block",width: "300px", textAlign: "left"}}>{this.props.id}</p><input id={inputAttr+"AI"} type="number" defaultValue={defVal} step={step}/>
      </div>
    );
  }
}

export default AIInputOption;
