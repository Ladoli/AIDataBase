import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AIInputOption from './AIFiles/AIInputOption';
import swal from 'sweetalert2';



class LoanAI extends Component {

  constructor(props){
    super(props);
    this.state = {
                    recommendedLoan:"",
                    currentLoanBalance:""
                  };

    this.calculateLoan = this.calculateLoan.bind(this);
  }

  calculateLoan() {
    let that = this;
    let incomeParam = document.getElementById("IncomeAI").value;
    let chidlrenParam = document.getElementById("Children CountAI").value;
    let interestParam = document.getElementById("Interest RateAI").value;
    let maxCalcusLoan = incomeParam*.3/(interestParam/100);
    if(incomeParam && chidlrenParam && interestParam){
        fetch('http://localhost:5000/LoanRecommenderAI?income='+incomeParam+'&kids='+chidlrenParam, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }}).then(function(response) {
      return response.json();
    })
    .then(function(prediction){
      if(prediction.prediction < 0 || maxCalcusLoan <  prediction.prediction ){
        that.setState({"recommendedLoan":"It is not recommended to approve a loan to this client"
        + "\nThe Maximum Loan Amount is " +parseFloat(maxCalcusLoan).toFixed(2)});
      }else{
        that.setState({"recommendedLoan":"Recommended Loan Amount is " +parseFloat(prediction.prediction).toFixed(2)
        + "\nThe Maximum Loan Amount is " +parseFloat(maxCalcusLoan).toFixed(2)});
      }
    });
      }else{
        swal({title: "Please fill in all fields"});
      }
  }

  calculatePreviousLoans(){
    let that = this;
    let loanIDParam = document.getElementById("Loan IDAI").value;

    if(!loanIDParam){
      swal({title:"Please enter a Loan ID to check"});
      return;
    }

    let query = "select SUM(AMT_CREDIT_SUM_DEBT) from bureau b INNER JOIN application_train a ON a.SK_ID_CURR = b.SK_ID_CURR WHERE b.SK_ID_CURR = " + loanIDParam;

    let queryTimeStart = new Date();

      fetch('http://localhost:8000/?query='+query, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }}).then(function(response) {
        let queryTime = (new Date() - queryTimeStart);
        that.setState({queryTime: queryTime});
    return response.json();
  })
  .then(function(querRes) {
    console.log(querRes)
    that.setState({currentLoanBalance: "Previous loan balance is " + querRes[0]['SUM(AMT_CREDIT_SUM_DEBT)']});
  });

  }


  render() {

    let currentBalance = this.state.currentLoanBalance;


    let recommendedLoan = this.state.recommendedLoan.split('\n').map(i => {
        return <p key={i}>{i}</p>
    });


    return (
      <div>
        <br/><br/>
        <h1>Loan Amount AI</h1>
        <br/><br/>
        <Route render={()=><AIInputOption id={"Income"} defaultVal={"0"}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"Children Count"} defaultVal={"0"}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"Interest Rate"} defaultVal={8}/>}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign: "center", width: "100%",marginBottm: "30px"}}>
          <div onClick={this.calculateLoan} id="calculateLoanButton" >Calculate Loan</div>
        </div>
        <div id="RecommendedLoan">{recommendedLoan}</div><br/>
        <div id="CalculatedLoan"></div>
        <br/>
        <br/>
        <h1>Previous Loans</h1>
        <br/><br/>
        <Route render={()=><AIInputOption id={"Loan ID"} />}/>
        <div style={{textAlign: "center", width: "100%",marginBottm: "30px"}}>
          <div onClick={this.calculatePreviousLoans} id="calculatePrevLoanButton" >Calculate Loan Balance</div>
        </div>
        <div id="CurrentLoanBalance" style={{display:"inline-block", width: "100%", textAlign: "center"}}>{currentBalance}</div>

      </div>
    );
  }
}

export default LoanAI;
