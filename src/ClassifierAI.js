import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import RadioOptionsClassifier from './ClassifierAI/RadioOptionsClassifier';
import AIInputOption from './AIFiles/AIInputOption';
import swal from 'sweetalert2';



class ClassifierAI extends Component {



  render() {

    return (
      <div>
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
        <Route render={()=><AIInputOption id={"OBS_30_CNT_SOCIAL_CIRCLE"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"DEF_30_CNT_SOCIAL_CIRCLE"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"External Source 2"} />}/>
        <br/>
        <Route render={()=><AIInputOption id={"External Source 2"} />}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Realty ownership"} options={["Owns realty","Does not own realty"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Car ownership"} options={["Owns car","Does not own car"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Loan contract"} options={["Cash loans","Revolving loans"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 2 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 3 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 4 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 5 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 6 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 7 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 8 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 9 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 10 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 11 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 12 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 13 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 14 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 15 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 16 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 17 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 18 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 19 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 20 valid"} options={["Yes","No"]}/>}/>
        <br/>
        <Route render={()=><RadioOptionsClassifier label={"Document 21 valid"} options={["Yes","No"]}/>}/>
        <br/>



        <br/>
        <br/>
        <div style={{textAlign: "center", width: "100%",marginBottm: "30px"}}>
          <div id="calculateLoanButton" >Calculate Recommended Loan</div>
        </div>
        <div id="RecommendedLoan"></div>

      </div>
    );
  }
}

export default ClassifierAI;
