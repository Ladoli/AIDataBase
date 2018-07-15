import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';

// import BlackjackAI from './Projects/BlackjackAI';



class AppRouter extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        {/* <Switch>
          <Route exact path={process.env.PUBLIC_URL+"/LoanGUI"} component={LoanGUI}/>
        </Switch> */}
          <Route path={process.env.PUBLIC_URL+"/"} component={App}/>
      </div>
    );
  }
}

export default AppRouter;
