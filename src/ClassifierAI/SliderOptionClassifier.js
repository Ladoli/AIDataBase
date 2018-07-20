import React, { Component } from 'react';




class SliderOptionClassifier extends Component {

  componentDidMount(){
  }

  render() {


    // <input type="radio" id="ownHouseAIRAdio" defaultChecked name="ownHouse-type"/>Owns House<br/>

    return (
      <div style={{width:"100%;", textAlign:"center"}}>
        <label style={{display: "inline-block", width: "490px", textAlign: "left"}} class="switch">
          <p style={{display: "inline-block",width: "300px", textAlign: "left"}}>
            {this.props.label}
          </p>
          <div style={{display: "inline-block",width: "60px", textAlign: "left", position: "relative", height: "24px"}}>
            <input type="checkbox" defaultChecked id={this.props.label + "sliderCheck"}/>
            <span class="slider round">
            </span>
          </div>
        </label>
      </div>
    );
  }
}

export default SliderOptionClassifier;
