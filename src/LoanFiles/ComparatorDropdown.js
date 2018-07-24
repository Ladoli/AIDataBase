import React, { Component } from 'react';



class ComparatorDropdown extends Component {



  render() {

    let idProp = {};
    if(!this.props.id){
    } else{
      idProp = this.props.id;
    }
    let toFieldIDProp = {};
    if(!this.props.toFieldID){
    } else{
      toFieldIDProp = this.props.toFieldID;
    }

    function checkComparator(){
      if(document.getElementById(idProp).value === "BETWEEN"){
        document.getElementById(toFieldIDProp).style.visibility ="visible";
      }else{
        document.getElementById(toFieldIDProp).style.visibility ="hidden";
      }
    }
    return (
      <select id={idProp} onChange={checkComparator}>
        <option value=">=">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>=</option>
        <option value=">">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></option>
        <option value="=" selected>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=</option>
        <option value="<">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</option>
        <option value="<=">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;=</option>
        <option value="BETWEEN">BETWEEN</option>
      </select>
    );
  }
}

export default ComparatorDropdown;
