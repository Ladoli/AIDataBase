import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import App from './App';
import AI from './AI';

// import BlackjackAI from './Projects/BlackjackAI';



class AppRouter extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL+"/"} component={App}/>
          <Route exact path={process.env.PUBLIC_URL+"/AI"} component={AI}/>
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
