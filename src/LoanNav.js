import React, { Component } from 'react';



class LoanNav extends Component {



  render() {
    return(
    <div id="loanNavBar">
      <div className="navLink">
        <a href="/"><div>Report Generator</div></a>
      </div>
      <div className="navLink">
      <a href="/LoanAI"><div>Loan Calculator</div></a>
      </div>
      <div className="navLink">
      <a href="/ClassifierAI"><div>Classifier</div></a>
    </div>
    </div>
    )
  }
}

export default LoanNav;
