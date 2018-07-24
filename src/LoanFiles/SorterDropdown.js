import React, { Component } from 'react';



class SorterDropdown extends Component {



  render() {
    let thisF = this;
    function checkComparator(){
      if(document.getElementById(thisF.props.id).value === "Unsorted" ){
        document.getElementById(thisF.props.toFieldIDProp).style.visibility ="hidden";
      }else{
        document.getElementById(thisF.props.toFieldIDProp).style.visibility ="visible";
      }
    }
    return (
      <div>
          Sort by:<br/>
        <select id={this.props.id} onChange={checkComparator}>
          <option value = "Unsorted" selected >Unsorted</option>
          <option value="INCOME_TOTAL">Income</option>
          <option value="AMT_CREDIT">Loan Amount</option>
          <option value="CNT_CHILDREN">Number of Kids</option>
          <option value="GOODS_PRICE">Goods Value</option>
          <option value="AMT_ANNUITY">Annuity</option>
          <option value="TARGET">Loan Success</option>
          <option value="CODE_GENDER">Gender</option>
          <option value="DAYS_BIRTH">Age</option>
        </select> <br/>
        <div id ={this.props.toFieldIDProp} style={{visibility: "hidden"}}>
        <input type="radio" name="sort-type" id="sortAsc" defaultChecked />Ascending<br/>
        <input type="radio" name="sort-type" id="sortDesc"/>Descending<br/>
        </div>
      </div>
    );
  }
}

export default SorterDropdown;
