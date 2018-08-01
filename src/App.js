import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import InputOption from './LoanFiles/InputOption';
import SorterDropdown from './LoanFiles/SorterDropdown';
import swal from 'sweetalert2';





class App extends Component {

  componentWillMount(){
    this.setState({maxPage:"1"});
    this.setState({INCOME_TOTAL:{MAX:"N/A", MIN:"N/A", TOTAL:0, AVG: 0}});
    this.setState({AMT_CREDIT:{MAX:"N/A", MIN:"N/A", TOTAL:0, AVG: 0}});
    this.setState({CNT_CHILDREN:{MAX:"N/A", MIN:"N/A", TOTAL:0, AVG: 0}});
    this.setState({GOODS_PRICE:{MAX:"N/A", MIN:"N/A", TOTAL:0}, AVG: 0});
    this.setState({AMT_ANNUITY:{MAX:"N/A", MIN:"N/A", TOTAL:0, AVG: 0}});
    this.setState({DAYS_BIRTH:{MAX:"N/A", MIN:"N/A", TOTAL:0, AVG: 0}});
    this.setState({returnedRowCount:0});

  }

  componentDidMount() {



  }

  render() {

    let thisF = this;

    function changePage(){
      document.getElementById("queryResults").innerHTML ="<BR/>"
      let results = thisF.state.results;
      let resLength = thisF.state.returnedRowCount;
      let maxPage = Math.ceil(resLength);
      let page = 1;
      if(document.getElementById("PaginationValue").value){
        page = document.getElementById("PaginationValue").value
        if(page > maxPage){
          page = maxPage;
        }
      }
      for(let i = (page-1)*25; results && results[i] && i<(page*25) && i<resLength; i++){
        if(results[i].SK_ID_CURR){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].SK_ID_CURR+"</DIV>";
        }
        if(results[i].INCOME_TOTAL){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].INCOME_TOTAL+"</DIV>";
        }
        if(results[i].AMT_CREDIT){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].AMT_CREDIT+"</DIV>";
        }
        if(results[i].CNT_CHILDREN === 0 || results[i].CNT_CHILDREN ){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].CNT_CHILDREN+"</DIV>";
        }
        if(results[i].GOODS_PRICE === 0 || results[i].GOODS_PRICE){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].GOODS_PRICE+"</DIV>";
        }
        if(results[i].AMT_ANNUITY === 0 ||results[i].AMT_ANNUITY){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].AMT_ANNUITY+"</DIV>";
        }
        if(results[i].DAYS_BIRTH === 0 || results[i].DAYS_BIRTH){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+Math.round((results[i].DAYS_BIRTH)/(-365))+"</DIV>";
        }
        if(results[i].CODE_GENDER === 0 || results[i].CODE_GENDER ){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].CODE_GENDER+"</DIV>";
        }
        if(results[i].TARGET === 0 || results[i].TARGET){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].TARGET+"</DIV>";
        }
        document.getElementById("queryResults").innerHTML +=  "<BR/>";
      }
    }



    function queryFunction() {
      let output = "";
      let summaryOutput = "";
      let tableName = "application_train";
      let where = "";
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
      outputQuery("GenderOut","CODE_GENDER");


      let sorter = "";

      if(document.getElementById("sortBy").value !== "Unsorted"){
        sorter = document.getElementById("sortBy").value;
        if(document.getElementById("sortDesc").checked){
          sorter += " DESC";
        }
      }


      if(output === ""){
        output = "SK_ID_CURR,INCOME_TOTAL,AMT_CREDIT,CNT_CHILDREN,GOODS_PRICE,AMT_ANNUITY,DAYS_BIRTH,CODE_GENDER,TARGET";
      }else{
        output = "SK_ID_CURR," + output;
      }

      let query = "SELECT " + output + " FROM " + tableName;
      if(where !== ""){
        query += " WHERE " + where ;
      }

      if(sorter !== ""){
        query += " ORDER BY " + sorter;
      }

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
        let header = outputHeaders[i];
        if(header === "SK_ID_CURR"){
          header = "ID";
        }else if (header === "INCOME_TOTAL") {
          header = "INCOME";
        }else if (header === "AMT_CREDIT") {
          header = "LOAN AMOUNT";
        }else if (header === "CNT_CHILDREN") {
          header = "CHILDREN";
        }else if (header === "GOODS_PRICE") {
          header = "GOODS PRICE";
        }else if (header === "AMT_ANNUITY") {
          header = "ANNUITY";
        }else if (header === "DAYS_BIRTH") {
          header = "AGE";
        }else if (header === "CODE_GENDER") {
          header = "GENDER";
        }else if (header === "TARGET") {
          header = "LOAN RESULT";
        }
        document.getElementById("queryHeaders").innerHTML += '<DIV class="displayResultCells">'+header+"</DIV>";
      }
      document.getElementById("queryResults").innerHTML ="<BR/>"
      let results = querRes;
      thisF.setState({returnedRowCount:results.length});
      thisF.setState({results:querRes});
      let maxPage = Math.ceil((results.length-1)/25);
      thisF.setState({maxPage:maxPage.toString()});
      let page = 1;
      if(document.getElementById("PaginationValue").value){
        page = document.getElementById("PaginationValue").value
        if(page > maxPage){
          page = maxPage;
        }
      }
      for(let i = (page-1)*25; results[i] && i<(page*25) && i<results.length; i++){
        if(results[i].SK_ID_CURR){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].SK_ID_CURR+"</DIV>";
        }
        if(results[i].INCOME_TOTAL){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].INCOME_TOTAL+"</DIV>";
        }
        if(results[i].AMT_CREDIT){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].AMT_CREDIT+"</DIV>";
        }
        if(results[i].CNT_CHILDREN === 0 || results[i].CNT_CHILDREN ){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].CNT_CHILDREN+"</DIV>";
        }
        if(results[i].GOODS_PRICE === 0 || results[i].GOODS_PRICE){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].GOODS_PRICE+"</DIV>";
        }
        if(results[i].AMT_ANNUITY === 0 ||results[i].AMT_ANNUITY){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].AMT_ANNUITY+"</DIV>";
        }
        if(results[i].DAYS_BIRTH === 0 || results[i].DAYS_BIRTH){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+Math.round((results[i].DAYS_BIRTH)/(-365))+"</DIV>";
        }
        if(results[i].CODE_GENDER === 0 || results[i].CODE_GENDER ){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].CODE_GENDER+"</DIV>";
        }
        if(results[i].TARGET === 0 || results[i].TARGET){
          document.getElementById("queryResults").innerHTML +=  '<DIV class="displayResultCells">'+results[i].TARGET+"</DIV>";
        }
        document.getElementById("queryResults").innerHTML +=  "<BR/>";
      }
      // displaySummaryInfo();
    });
    if(summaryOutput === ""){
      summaryOutput = "MIN(INCOME_TOTAL), MAX(INCOME_TOTAL), SUM(INCOME_TOTAL), AVG(INCOME_TOTAL), MIN(AMT_CREDIT), MAX(AMT_CREDIT), SUM(AMT_CREDIT), AVG(AMT_CREDIT), MIN(CNT_CHILDREN), MAX(CNT_CHILDREN), SUM(CNT_CHILDREN), AVG(CNT_CHILDREN), MIN(GOODS_PRICE), MAX(GOODS_PRICE), SUM(GOODS_PRICE), AVG(GOODS_PRICE), MIN(AMT_ANNUITY), MAX(AMT_ANNUITY), SUM(AMT_ANNUITY), AVG(AMT_ANNUITY), MIN(DAYS_BIRTH), MAX(DAYS_BIRTH), SUM(DAYS_BIRTH), AVG(DAYS_BIRTH), MIN(TARGET), MAX(TARGET), SUM(TARGET), AVG(TARGET), MIN(CODE_GENDER), MAX(CODE_GENDER), SUM(CODE_GENDER), AVG(CODE_GENDER)";
    }
    let summaryQuery = "SELECT " + summaryOutput + " FROM " + tableName;
    if(where !== ""){
      summaryQuery += " WHERE " + where ;
    }

    let summaryQueryTimeStart = new Date();

    fetch('http://localhost:8000/?query='+summaryQuery, {
    method: 'GET',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }}).then(function(response) {
          let queryTime = (new Date() - summaryQueryTimeStart);
          thisF.setState({summaryQueryTime: queryTime});
      return response.json();
    })
    .then(function(querRes) {
        console.log(querRes)
        summaryInfoUpdate(querRes);
        document.getElementById("querySummary").innerHTML = "";
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
            summaryOutput = "MIN("+attribute+"), MAX("+attribute+"), SUM("+attribute+"), AVG("+attribute+")";
          }else{
            output += ","+attribute;
            summaryOutput += ", MIN("+attribute+"), MAX("+attribute+"), SUM("+attribute+"), AVG("+attribute+")";

          }
        }
      }

    }

    function summaryInfoUpdate(data){
      console.log(data[0])
      let dataObj = data[0];
      if(dataObj['MAX(INCOME_TOTAL)']){
        thisF.setState({INCOME_TOTAL:{MAX:dataObj['MAX(INCOME_TOTAL)'], MIN:dataObj['MIN(INCOME_TOTAL)'], TOTAL:dataObj['SUM(INCOME_TOTAL)'].toFixed(2), AVG:dataObj['AVG(INCOME_TOTAL)'].toFixed(2)}});
      }
      if(dataObj['MAX(AMT_CREDIT)']){
        thisF.setState({AMT_CREDIT:{MAX:dataObj['MAX(AMT_CREDIT)'], MIN:dataObj['MIN(AMT_CREDIT)'], TOTAL:dataObj['SUM(AMT_CREDIT)'], AVG:dataObj['AVG(AMT_CREDIT)'].toFixed(2)}});
      }
      if(dataObj['MAX(CNT_CHILDREN)']){
        thisF.setState({CNT_CHILDREN:{MAX:dataObj['MAX(CNT_CHILDREN)'], MIN:dataObj['MIN(CNT_CHILDREN)'], TOTAL:dataObj['SUM(CNT_CHILDREN)'], AVG:dataObj['AVG(CNT_CHILDREN)'].toFixed(2)}});
      }
      if(dataObj['MAX(GOODS_PRICE)']){
        thisF.setState({GOODS_PRICE:{MAX:dataObj['MAX(GOODS_PRICE)'], MIN:dataObj['MIN(GOODS_PRICE)'], TOTAL:dataObj['SUM(GOODS_PRICE)'], AVG:dataObj['AVG(GOODS_PRICE)'].toFixed(2)}});
      }
      if(dataObj['MAX(AMT_ANNUITY)']){
        thisF.setState({AMT_ANNUITY:{MAX:dataObj['MAX(AMT_ANNUITY)'], MIN:dataObj['MIN(AMT_ANNUITY)'], TOTAL:dataObj['SUM(AMT_ANNUITY)'], AVG:dataObj['AVG(AMT_ANNUITY)'].toFixed(2)}});
      }
      if(dataObj['MIN(DAYS_BIRTH)']){
        thisF.setState({DAYS_BIRTH:{MAX: Math.round(dataObj['MIN(DAYS_BIRTH)']/(-365)), MIN: Math.round(dataObj['MAX(DAYS_BIRTH)']/(-365)), TOTAL: 'N/A', AVG: Math.round(dataObj['AVG(DAYS_BIRTH)']/(-365))}});
      }
      // this.setState({AMT_CREDIT:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
      // this.setState({CNT_CHILDREN:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
      // this.setState({GOODS_PRICE:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
      // this.setState({AMT_ANNUITY:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
      // this.setState({DAYS_BIRTH:{MAX:"N/A", MIN:"N/A", TOTAL:0}});
      // let newMin;
      // let newMax;
      //
      // if(thisF.state[keyObject].MIN === "N/A"){
      //   newMin = data[keyObject];
      // }else{
      //   newMin = thisF.state[keyObject].MIN
      // }
      //
      // if(thisF.state[keyObject].MAX === "N/A"){
      //   newMax = data[keyObject];
      // }else{
      //   newMax = thisF.state[keyObject].MAX
      // }
      // let newTotal = thisF.state[keyObject].TOTAL;
      //
      //
      // if(data[keyObject] > newMax){
      //   newMax = data[keyObject];
      // }
      // if(data[keyObject] < newMin){
      //   newMin = data[keyObject];
      // }
      // newTotal += data[keyObject];
      // var updatedKey = {[keyObject]:{MAX:newMax, MIN:newMin, TOTAL: newTotal}};
      // thisF.setState(updatedKey);
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
        if(key === 'DAYS_BIRTH'){
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">AGE</DIV>';
        }else if(key === 'INCOME_TOTAL'){
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">INCOME</DIV>';
        }else if(key === 'CNT_CHILDREN'){
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">CHILDREN</DIV>';
        }else if(key === 'GOODS_PRICE'){
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">GOODS PRICE</DIV>';
        }else if(key === 'AMT_ANNUITY'){
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">ANNUITY</DIV>';
        }else if(key === 'AMT_CREDIT'){
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">LOAN AMOUNT</DIV>';
        }else{
          document.getElementById("querySummary").innerHTML += '<BR/><DIV class="summaryResultCell">'+key+'</DIV>';
        }
        document.getElementById("querySummary").innerHTML += '<DIV class="summaryResultCell">'+thisF.state[key].MAX+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].MIN+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].TOTAL+'</DIV>'
        + '<DIV class="summaryResultCell">'+thisF.state[key].AVG+'</DIV>';
      }
    }

    return (
      <div className="container" style={{"marginTop":"40px"}}>
        <h2>Input Information</h2><br/>
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
        <h2>Entry Output Information</h2><br/>
        <div className="row">
          <div className="col-xs-12" style={{"width": "100%", "display": "inline-block"}}>
            <div className="col-sm-4 LoanOptionsBox" >
              <input type="checkbox" id="IncomeOut" /> Income<br/>
              <input type="checkbox" id="Loan AmountOut" /> Loan Amount<br/>
              <input type="checkbox" id="Number of KidsOut"/> Number of Kids<br/>
              <input type="checkbox" id="Goods ValueOut" /> Goods Value<br/>

            </div>
            <div className="col-sm-4 LoanOptionsBox">
              <input type="checkbox" id="AnnuityOut" /> Annuity<br/>
              <input type="checkbox" id="LoanOut" /> Loan Result<br/>
              <input type="checkbox" id="GenderOut" /> Gender<br/>
              <input type="checkbox" id="AgeOut" /> Age<br/>
            </div>
            <div className="col-sm-4 LoanOptionsBox">
              <Route render={()=><SorterDropdown id={"sortBy"} toFieldIDProp={"hiddenSort"}/>}/>
            </div>
            <br/>
            <br/>
            <br/>
          </div>
        </div>
        <br/><br/>
        <div style={{textAlign: "center", width: "100%"}}>
          <div onClick={queryFunction} id="queryButton" >Find</div>
        </div>
        <br/>
        <br/>
        <div style={{ display: "inline-block", width: "100%", textAlign: "center"}}>
          <div className="LoanOptionsTrimmer">
              Page
          </div>
          <input  style={{marginLeft: "30px"}} id={"PaginationValue"} type="number" min="1" max={thisF.state.maxPage} onChange={changePage} defaultValue="1"/>
        </div>
        <br/>
        <br/>
        <div id="queryHeaders"></div>
        <div id="queryResults"></div>
        <div id="querySummary"></div>
      </div>
    );
  }
}

export default App;
