import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ComparatorDropdown from './ComparatorDropdown.js'




class InputOption extends Component {

  componentDidMount(){
    let inputAttr = {};
    if(!this.props.inputAttr){
    } else{
      inputAttr = this.props.inputAttr;
      document.getElementById(inputAttr+"ToValue").style.visibility="hidden";
    }
  }

  render() {
    let inputStyle = {marginLeft: "30px"};

    let inputAttr = {};
    if(!this.props.inputAttr){
    } else{
      inputAttr = this.props.inputAttr;
    }
    return (
      <div>
      <div className="LoanOptionsTrimmer">
        <div style={{width: "140px", display: "inline-block"}}><input type="checkbox" id={inputAttr+"Check"} /> {inputAttr} </div>
        <Route render={()=><ComparatorDropdown     id={inputAttr+"Operation"} toFieldID={inputAttr+"ToValue"}/>}/>
      </div> <input  style={inputStyle} id={inputAttr+"Value"} type="number"/> <input   style={inputStyle} id={inputAttr+"ToValue"} type="number"/><br/>
      </div>
    );
  }
}

export default InputOption;
