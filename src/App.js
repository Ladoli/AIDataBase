import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import InputOption from './LoanFiles/InputOption.js';
import swal from 'sweetalert2';
let thisF;





class App extends Component {

  componentDidMount() {
    thisF = this;
    this.setState({INCOME_TOTAL:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
    this.setState({AMT_CREDIT:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
    this.setState({CNT_CHILDREN:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
    this.setState({GOODS_PRICE:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
    this.setState({AMT_ANNUITY:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
    this.setState({DAYS_BIRTH:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
    this.setState({returnedRowCount:0});
  }

  render() {



    function queryFunction() {
      let output = "";
      let tableName = "application_train";
      let where = "";
      let limit = 100;
      inputQuery("Income", "INCOME_TOTAL");
      inputQuery("Loan Amount", "AMT_CREDIT");
      inputQuery("Number of Kids", "CNT_CHILDREN");
      inputQuery("Goods Value", "GOODS_PRICE");
      inputQuery("Annuity", "AMT_ANNUITY");
      inputQuery("Age", "DAYS_BIRTH");
      genderQuery();
      loanSuccessQuery();
      outputQuery("IncomeOut","INCOME_TOTAL");
      outputQuery("Loan AmountOut","AMT_CREDIT");
      outputQuery("Number of KidsOut","CNT_CHILDREN");
      outputQuery("Goods ValueOut","GOODS_PRICE");
      outputQuery("AnnuityOut","AMT_ANNUITY");
      outputQuery("AgeOut","DAYS_BIRTH");
      outputQuery("LoanOut","TARGET");


      if(document.getElementById("LimitOut").value){
        limit = document.getElementById("LimitOut").value;
      }


      if(output === ""){
        output = "INCOME_TOTAL,AMT_CREDIT,CNT_CHILDREN,GOODS_PRICE,AMT_ANNUITY,DAYS_BIRTH,CODE_GENDER,TARGET";
      }

      let query = "SELECT " + output + " FROM " + tableName;
      if(where !== ""){
        query += " WHERE " + where ;
      }
      query += " LIMIT " + limit;

      let outputHeaders = output.split(',');



      let queryTimeStart = new Date();

        fetch('http://localhost:8000/?query='+query, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }}).then(function(response) {
          let queryTime = (new Date() - queryTimeStart);
          thisF.setState({queryTime: queryTime});
      return response.json();
    })
    .then(function(querRes) {
        document.getElementById("queryHeaders").innerHTML ='';
      for(let i = 0; i< outputHeaders.length; i++){
        document.getElementById("queryHeaders").innerHTML += '<DIV class="displayResultCells">'+outputHeaders[i]+"</DIV>";
      }
      document.getElementById("queryResults").innerHTML ="<BR/>"
      let results = querRes;
      thisF.setState({returnedRowCount:results.length});
      for(let i = 0; i<results.length; i++){
        if(results[i].INCOME_TOTAL){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].INCOME_TOTAL+"</DIV>";
          summaryInfoUpdate('INCOME_TOTAL',results[i]);
        }
        if(results[i].AMT_CREDIT){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].AMT_CREDIT+"</DIV>";
          summaryInfoUpdate('AMT_CREDIT',results[i]);
        }
        if(results[i].CNT_CHILDREN === 0 || results[i].CNT_CHILDREN ){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].CNT_CHILDREN+"</DIV>";
          summaryInfoUpdate('CNT_CHILDREN',results[i]);
        }
        if(results[i].GOODS_PRICE){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].GOODS_PRICE+"</DIV>";
          summaryInfoUpdate('GOODS_PRICE',results[i]);
        }
        if(results[i].AMT_ANNUITY){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].AMT_ANNUITY+"</DIV>";
          summaryInfoUpdate('AMT_ANNUITY',results[i]);
        }
        if(results[i].DAYS_BIRTH){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].DAYS_BIRTH+"</DIV>";
          summaryInfoUpdate('DAYS_BIRTH',results[i]);
        }
        if(results[i].CODE_GENDER === 0 || results[i].CODE_GENDER ){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].CODE_GENDER+"</DIV>";
        }
        if(results[i].TARGET === 0 || results[i].TARGET){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].TARGET+"</DIV>";
        }
        document.getElementById("queryResults").innerHTML +=  "<BR/>";
      }
      displaySummaryInfo();
    });


      function genderQuery(){
        let displayMale = document.getElementById("maleFilter");
        let displayFemale = document.getElementById("femaleFilter");
        if(displayMale.checked){
            if(where !== ""){
              where += " AND CODE_GENDER = 'M' ";
            }else{
              where += "CODE_GENDER = 'M' ";
            }
        }else if(displayFemale.checked){
            if(where !== ""){
              where += " AND CODE_GENDER = 'F' ";
            }else{
              where += "CODE_GENDER = 'F' ";
            }
        }
      }


      function loanSuccessQuery(){
        let displaySuccessLoan = document.getElementById("successLoan");
        let displayProblemLoan = document.getElementById("problemLoan");

        if(displaySuccessLoan.checked){
            if(where !== ""){
              where += " AND TARGET = 0 ";
            }else{
              where = "TARGET = 0 ";
            }
        }else if(displayProblemLoan.checked){
            if(where !== ""){
              where += " AND TARGET = 1 ";
            }else{
              where = "TARGET = 1 ";
            }
        }
      }

      function inputQuery(idInput, attribute){
        let box = document.getElementById(idInput+"Check");

        if(box.checked){
          let operator = document.getElementById(idInput+"Operation").value;
          let value1 = document.getElementById(idInput + "Value").value;
          if(where !== ""){
            if(!value1){
              swal({title:"Missing value for the input: " + idInput});
              return;
            }
            if(operator !== "BETWEEN"){
              where += " AND " + attribute + " " + operator + " " +value1;
            }else{
              let value2 = document.getElementById(idInput + "ToValue").value;
              if(!value2){
                swal({title:"Missing value ceiling for the input: " + idInput});
                return;
              }
              where += " AND " + attribute + " > " +value1 + " AND " + attribute + " < " + value2;
            }
          }else{
            if(!value1){
              swal({title:"Missing value for the input: " + idInput});
              return;
            }
            if(operator !== "BETWEEN"){
              where = attribute + " " + operator + " " +value1;
            }else{
              let value2 = document.getElementById(idInput + "ToValue").value;
              if(!value2){
                swal({title:"Missing value ceiling for the input: " + idInput});
                return;
              }
              where = attribute + " > " +value1 + " AND " + attribute + " < " + value2;
            }
          }
        }
      }

      function outputQuery(idInput, attribute){
        if(document.getElementById(idInput).checked){
          if(output === ""){
            output = attribute;
          }else{
            output += ","+attribute;
          }
        }
      }

    }

    function summaryInfoUpdate(keyObject,data){
      let newMin;
      let newMax;

      if(thisF.state[keyObject].MIN === "N/A"){
        newMin = data[keyObject];
      }else{
        newMin = thisF.state[keyObject].MIN
      }

      if(thisF.state[keyObject].MAX === "N/A"){
        newMax = data[keyObject];
      }else{
        newMax = thisF.state[keyObject].MAX
      }
      let newTotal = thisF.state[keyObject].TOTAL;


      if(data[keyObject] > newMax){
        newMax = data[keyObject];
      }
      if(data[keyObject] < newMin){
        newMin = data[keyObject];
      }
      newTotal += data[keyObject];
      var updatedKey = {[keyObject]:{MAX:newMax, MIN:newMin, TOTAL: newTotal}};
      thisF.setState(updatedKey);
    }

    function displaySummaryInfo(){
      document.getElementById("querySummary").innerHTML = '<BR/><DIV class="summaryRow">Query Time: '+ thisF.state.queryTime +'ms</DIV>';
      document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryRow">Result Count: '+thisF.state.returnedRowCount+'</DIV>';
      document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryRow">Summary Information</DIV>';
      document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell"> FIELD</DIV>'
      + '<DIV class="summaryResultCell">MAX:</DIV>'
      + '<DIV class="summaryResultCell">MIN:</DIV>'
      + '<DIV class="summaryResultCell">TOTAL:</DIV>'
      + '<DIV class="summaryResultCell">AVERAGE:</DIV>';
      displaySummaryRow('INCOME_TOTAL');
      displaySummaryRow('AMT_CREDIT');
      displaySummaryRow('CNT_CHILDREN');
      displaySummaryRow('GOODS_PRICE');
      displaySummaryRow('AMT_ANNUITY');
      displaySummaryRow('DAYS_BIRTH');


      function displaySummaryRow(key){
        document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">'+key+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].MAX+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].MIN+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].TOTAL+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].TOTAL/thisF.state.returnedRowCount+'</DIV>';
      }
    }

    return (
      <div className="container" style={{"marginTop":"40px"}}>
        Input Information
        <div className="row">
          <div className="col-xs-12" style={{"width": "100%", "display": "inline-block"}}>
            <div className="col-sm-9 LoanOptionsBox" >
              <Route render={()=><InputOption inputAttr={"Income"}/>}/>
              <Route render={()=><InputOption inputAttr={"Loan Amount"}/>}/>
              <Route render={()=><InputOption inputAttr={"Number of Kids"}/>}/>
              <Route render={()=><InputOption inputAttr={"Goods Value"}/>}/>
              <Route render={()=><InputOption inputAttr={"Annuity"}/>}/>
              <Route render={()=><InputOption inputAttr={"Age"}/>}/>
            </div>

            <div className="col-sm-3 LoanOptionsBox">
              <input type="radio" defaultChecked name="data-type"/> All loans<br/>
              <input type="radio" name="data-type" id="successLoan" /> Sucessful loans<br/>
              <input type="radio" name="data-type" id="problemLoan" /> Loans with problems<br/>
              <input type="radio" defaultChecked name="gender-type"/>  All Gender<br/>
              <input type="radio" name="gender-type" id="maleFilter"/>  Male<br/>
              <input type="radio" name="gender-type" id="femaleFilter"/>  Female<br/>
            </div>
          </div>
        </div>
        <br/><br/><br/><br/>
        Entry Output Information
        <div className="row">
          <div className="col-xs-12" style={{"width": "100%", "display": "inline-block"}}>
            <div className="col-sm-4 LoanOptionsBox" >
              <input type="checkbox" id="IncomeOut" /> Income<br/>
              <input type="checkbox" id="Loan AmountOut" /> Loan Amount<br/>
              <input type="checkbox" id="Number of KidsOut"/> Number of Kids<br/>
            </div>
            <div className="col-sm-4 LoanOptionsBox">
              <input type="checkbox" id="Goods ValueOut" /> Goods Value<br/>
              <input type="checkbox" id="AnnuityOut" /> Annuity<br/>
              <input type="checkbox" id="LoanOut" /> Loan Result<br/>
            </div>
            <div className="col-sm-4 LoanOptionsBox">
              <input type="checkbox" id="GenderOut" /> Gender<br/>
              <input type="checkbox" id="AgeOut" /> Age<br/>
            </div>
            <br/>
            <br/>
            <br/>
            <div style={{textAlign: "center"}}>Limit: <input type="number" id="LimitOut" /><br/></div>
          </div>
        </div>
        <br/><br/>
        {/* Summary Output Information
        <div className="row">
          <div className="col-xs-12" style={{"width": "100%", "display": "inline-block"}}>
            <div className="col-sm-4 LoanOptionsBox" >
              <input type="checkbox" />Income<br/>
              <input type="checkbox" />Loan Amount<br/>
              <input type="checkbox" />Number of Kids<br/>
              <input type="checkbox" />Goods Value<br/>
              <input type="checkbox" />Annuity<br/>
              <input type="checkbox" />Gender<br/>
              <input type="checkbox" />Age<br/>
            </div>
            <div className="col-sm-4 LoanOptionsBox">
              <input type="checkbox" />Max<br/>
              <input type="checkbox" />Minimum<br/>
              <input type="checkbox" />Average<br/>
              <input type="checkbox" />Total<br/>
              <input type="checkbox" />Count<br/>
            </div>
            <div className="col-sm-4 LoanOptionsBox">
              <input type="checkbox" /> Sucessful loans<br/>
              <input type="checkbox" /> Loans with problems<br/>
            </div>
          </div>
        </div> */}
        <br/>
        <div style={{textAlign: "center", width: "100%"}}>
          <div onClick={queryFunction} id="queryButton" >Find</div>
        </div>

        <br/>
        <div id="queryHeaders"></div>
        <div id="queryResults"></div>
        <div id="querySummary"></div>
      </div>
    );
  }
}

export default App;
