import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import RadioOptionsClassifier from './ClassifierAI/RadioOptionsClassifier';
import SliderOptionClassifier from './ClassifierAI/SliderOptionClassifier';
import AIInputOption from './AIFiles/AIInputOption';
import swal from 'sweetalert2';



class ClassifierAI extends Component {

  componentWillMount(){
    if(!this.state || !this.state.classificationResult){
      this.setState({classificationResult:""});
    }
  }



  render() {
    let thisF = this;

    let classificationResult = thisF.state.classificationResult;

    function calculateLoanSuccess() {
      // let incomeParam = document.getElementById("IncomeAI").value;
      // let chidlrenParam = document.getElementById("Children CountAI").value;
      let getVars = "kids="+document.getElementById("Children CountAI").value+"&";
          for(let i = 2; i < 21; i++){
            if(document.getElementById("Document "+ i +" providedsliderCheck").checked){
              getVars +="doc"+i+"=1&"
            }else{
              getVars +="doc"+i+"=0&"
            }
          }
          getVars += "fam="+document.getElementById("Family Size CountAI").value+"&";
          getVars += "regRatCli="+document.getElementById("Region RatingAI").value+"&";
          getVars += "regRatCliCity="+document.getElementById("Region Rating with CityAI").value+"&";
          getVars += "src2="+document.getElementById("External Source 2AI").value+"&";
          getVars += "obs30soc="+document.getElementById("30 Day Observations Social CircleAI").value+"&";
          getVars += "def30soc="+document.getElementById("30 Day Defaults Social CircleAI").value+"&";
          getVars += "obs60soc="+document.getElementById("60 Day Observations Social CircleAI").value+"&";
          getVars += "def60soc="+document.getElementById("60 Day Defaults Social CircleAI").value+"&";
          if(document.getElementById("Owns RealtysliderCheck").checked){
            getVars +="ownRealty=Y&"
          }
          if(document.getElementById("Owns CarsliderCheck").checked){
            getVars +="ownCar=Y&"
          }
          if(document.getElementById("Provided Mobile NumbersliderCheck").checked){
            getVars +="flagMob=1&"
          }
          if(document.getElementById("Provided Employee Phone NumbersliderCheck").checked){
            getVars +="flagEmpMob=1&"
          }
          if(document.getElementById("Provided Home Phone NumbersliderCheck").checked){
            getVars +="flagWorkMob=1&"
          }
          if(document.getElementById("Mobile VerifiedsliderCheck").checked){
            getVars +="flagContMob=1&"
          }
          if(document.getElementById("Provided Home Phone 2sliderCheck").checked){
            getVars +="flagPhone=1&"
          }
          if(document.getElementById("Provided EmailsliderCheck").checked){
            getVars +="flagEmail=1&"
          }
          if(document.getElementById("Region: Permanent matches contactsliderCheck").checked){
            getVars +="flagRegNoLive=0&"
          }
          if(document.getElementById("Region: Permanent matches worksliderCheck").checked){
            getVars +="flagRegNoWork=0&"
          }
          if(document.getElementById("Region: Contact matches worksliderCheck").checked){
            getVars +="flagLiveNoWork=0&"
          }
          if(document.getElementById("City: Permanent matches contactsliderCheck").checked){
            getVars +="flagRegNoLiveCity=0&"
          }
          if(document.getElementById("City: Permanent matches worksliderCheck").checked){
            getVars +="flagCityNoWork=0&"
          }
          if(document.getElementById("City: Contact matches worksliderCheck").checked){
            getVars +="flagLiveNoWorkCity=0&"
          }



          getVars += "loanType="+document.querySelector('input[name="Loan contract-type"]:checked').value;



        // ?income='+incomeParam+'&kids='+chidlrenParam
          fetch('http://localhost:5000/ClassifierAI?' + getVars, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }}).then(function(response) {
        return response.json();
      })
      .then(function(prediction){
        if(prediction.error){
          thisF.setState({classificationResult: prediction.error});
        }else{
          console.log(prediction.loanClassification)
          if(prediction.loanClassification === 1){
            thisF.setState({classificationResult: "Loan fails"});
          }else{
            thisF.setState({classificationResult: "Loan Succeeds"});
          }
        }
      });
    }

    return (
      <div style={{textAlign: "center"}}>
        <br/><br/>
        <h1>Calculate Loan Eligibility AI</h1>
        <br/><br/>
        <Route render={()=><AIInputOption id={"Children Count"} defaultVal={"0"}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"Family Size Count"}  defaultVal={1}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"Region Rating"} defaultVal={1}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"Region Rating with City"} defaultVal={1}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"External Source 2"} defaultVal={"0"} step={"decimal"}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"30 Day Observations Social Circle"} defaultVal={"0"}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"30 Day Defaults Social Circle"} defaultVal={"0"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"60 Day Observations Social Circle"} defaultVal={"0"}/>}/>
        <br/>
        <Route render={()=><AIInputOption id={"60 Day Defaults Social Circle"} defaultVal={"0"}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Loan contract"} options={["Cash loans","Revolving loans"]} />}/>
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
        <Route render={()=><SliderOptionClassifier label={"Mobile Verified"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Home Phone 2"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier label={"Provided Email"} />}/>
        <br/>
        <h2>Document Flags</h2>
        <br/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} notChecked={true} label={"Document 2 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 2 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 3 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 4 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 5 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 6 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 7 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 8 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 9 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 10 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 11 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 12 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 13 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 14 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 15 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 16 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 17 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 18 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 19 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 20 provided"} />}/>
        <br/>
        <Route render={()=><SliderOptionClassifier notChecked={true} label={"Document 21 provided"} />}/>
        <br/>
        <h2>Address Flags</h2>
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
        <div id="classificationResult">{classificationResult}</div>
        <div id="probabilityResult"></div>


      </div>
    );
  }
}

export default ClassifierAI;
