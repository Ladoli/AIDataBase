import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import LoanAI from './LoanAI';
import ClassifierAI from './ClassifierAI';

// import BlackjackAI from './Projects/BlackjackAI';



class AppRouter extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL+"/"} component={App}/>
          <Route exact path={process.env.PUBLIC_URL+"/LoanAI"} component={LoanAI}/>
          <Route exact path={process.env.PUBLIC_URL+"/ClassifierAI"} component={ClassifierAI}/>

        </Switch>
      </div>
    );
  }
}

export default AppRouter;
