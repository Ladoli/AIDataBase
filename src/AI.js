import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AIInputOption from './AIFiles/AIInputOption';
import swal from 'sweetalert2';



class AI extends Component {



  render() {
    function calculateLoan() {
      let incomeParam = document.getElementById("IncomeAI").value;
      let chidlrenParam = document.getElementById("Children CountAI").value;
      let annuityParam = document.getElementById("AnnuityAI").value;
      let soruceParam = document.getElementById("External Source 2AI").value;
      if(incomeParam){

          let houseOwnership = "N";
          let loanType= "Revolving loans";
          if(document.getElementById("ownHouseAIRAdio").checked){
            houseOwnership = "Y";
          }
          if(document.getElementById("cashLoanAIRAdio").checked){
            houseOwnership = "Cash loans";
          }

          fetch('http://localhost:5000/?income='+incomeParam+'&kids='+chidlrenParam+'&annuity='+annuityParam+'&src2='+
          soruceParam+'&houseOwn='+houseOwnership+'&loanType='+loanType, {
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
          document.getElementById("RecommendedLoan").innerHTML = "Recommended Loan Amount is " +prediction.prediction;
        }
      });

          // unadjustedPassedInc = float(request.args["income"])
          // passedAnnuity = float(request.args["annuity"])
          // passedKids = float(request.args["kids"])
          // passedSrc = float(request.args["src2"])
          // passedHouse = request.args["houseOwn"]
          // passedLoan = request.args["loanType"]
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
        <Route render={()=><AIInputOption id={"Annuity"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"External Source 2"} />}/>
        <br/>
        <div className="inputAI">
          <p style={{display: "inline-block",width: "200px", textAlign: "left"}}>Own House</p>
          <div style={{display: "inline-block",width: "190px", textAlign: "left"}}>
            <input type="radio" id="ownHouseAIRAdio" defaultChecked name="ownHouse-type"/>Owns House<br/>
            <input type="radio" name="ownHouse-type"/>Does Not Own House
          </div>
        </div>
        <br/>
        <div className="inputAI">
          <p style={{display: "inline-block",width: "200px", textAlign: "left"}}>Type of Loan</p>
          <div style={{display: "inline-block",width: "190px", textAlign: "left"}}>
            <input type="radio" id="cashLoanAIRAdio" defaultChecked name="loan-type"/>Cash Loans<br/>
            <input type="radio" name="loan-type"/>Revolving Loans
          </div>
        </div>
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
