import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import RadioOptionsClassifier from './ClassifierAI/RadioOptionsClassifier';
import SliderOptionClassifier from './ClassifierAI/SliderOptionClassifier';
import AIInputOption from './AIFiles/AIInputOption';
import swal from 'sweetalert2';



class ClassifierAI extends Component {



  render() {
    function calculateLoanSuccess() {
      // let incomeParam = document.getElementById("IncomeAI").value;
      // let chidlrenParam = document.getElementById("Children CountAI").value;
      if(true){
        // ?income='+incomeParam+'&kids='+chidlrenParam
          fetch('http://localhost:5000/ClassifierAI?dfsdf=er', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }}).then(function(response) {
        return response.json();
      })
      .then(function(prediction){
        if(prediction.error){
          document.getElementById("classificationResult").innerHTML = prediction.error;
        }else{
          console.log(prediction.loanClassification)
          if(prediction.loanClassification === 1){
            document.getElementById("classificationResult").innerHTML = "Loan fails";
          }else{
            document.getElementById("classificationResult").innerHTML = "Loan Succeeds";
          }
          //We use a 50% increase as the max this increases the accuracy to 72% from 50%. Increased accuracy is minimal after this point.
          document.getElementById("probabilityResult").innerHTML = parseFloat(prediction.probability).toFixed(2);
        }
      });
        }else{
          swal({title: "Please fill in all fields"});
        }
    }

    return (
      <div style={{textAlign: "center"}}>
        <br/><br/>
        <center>Calculate Loan Eligibility AI</center>
        <br/><br/>
        <Route render={()=><AIInputOption id={"Children Count"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"Family Size Count"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"Region Rating"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"Region Rating with City"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"External Source 2"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"30 Day Observations Social Circle"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"30 Day Defaults Social Circle"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"60 Day Observations Social Circle"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"60 Day Defaults Social Circle"} />}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Loan contract"} options={["Cash loans","Revolving loans"]}/>}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Owns Realty"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Owns Car"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Mobile Number"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Employee Phone Number"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Home Phone Number"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Mobile verified"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Home Phone 2"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Email"} />}/>
        <br/>
        Document Flags:
        <br/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 2 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 2 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 3 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 4 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 5 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 6 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 7 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 8 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 9 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 10 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 11 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 12 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 13 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 14 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 15 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 16 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 17 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 18 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 19 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 20 valid"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Document 21 valid"} />}/>
        <br/>
        Address Flags:
        <br/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Region: Permanent matches contact"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Region: Permanent matches work"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Region: Contact matches work"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"City: Permanent matches contact"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"City: Permanent matches work"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"City: Contact matches work"} />}/>
        <br/>
        <br/>
        <br/>
        <div style={{textAlign: "center", width: "100%",marginBottm: "30px"}}>
          <div id="calculateLoanButton" onClick={calculateLoanSuccess}>Calculate Loan Success</div>
        </div>
        <div id="classificationResult"></div>
        <div id="probabilityResult"></div>


      </div>
    );
  }
}

export default ClassifierAI;
