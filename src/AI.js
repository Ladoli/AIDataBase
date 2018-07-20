import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AIInputOption from './AIFiles/AIInputOption';
import swal from 'sweetalert2';



class AI extends Component {



  render() {
    function calculateLoan() {
      let incomeParam = document.getElementById("IncomeAI").value;
      let chidlrenParam = document.getElementById("Children CountAI").value;
      if(incomeParam){
          fetch('http://localhost:5000/LoanRecommenderAI?income='+incomeParam+'&kids='+chidlrenParam, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }}).then(function(response) {
        return response.json();
      })
      .then(function(prediction){
        if(prediction.prediction < 0){
          document.getElementById("RecommendedLoan").innerHTML = "It is not recommended to approve a loan to this client";
        }else{
          document.getElementById("RecommendedLoan").innerHTML = "Recommended Loan Amount is " +parseFloat(prediction.prediction).toFixed(2)
          + "<br/>The Maximum Recommended Loan Amount is " +parseFloat(prediction.prediction*1.5).toFixed(2);
          //We use a 50% increase as the max this increases the accuracy to 72% from 50%. Increased accuracy is minimal after this point.
        }
      });
        }else{
          swal({title: "Please fill in all fields"});
        }
    }

    return (
      <div>
        <br/><br/>
        <center>Loan Amount AI</center>
        <br/><br/>
        <Route render={()=><AIInputOption id={"Income"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"Children Count"} />}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign: "center", width: "100%",marginBottm: "30px"}}>
          <div onClick={calculateLoan} id="calculateLoanButton" >Calculate Recommended Loan</div>
        </div>
        <div id="RecommendedLoan"></div>

      </div>
    );
  }
}

export default AI;
