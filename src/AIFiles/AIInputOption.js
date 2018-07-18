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

    return (
      <div className="inputAI">
        <p style={{display: "inline-block",width: "200px", textAlign: "left"}}>{this.props.id}</p><input id={inputAttr+"AI"} type="number"/>
      </div>
    );
  }
}

export default AIInputOption;
