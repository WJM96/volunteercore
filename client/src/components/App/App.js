import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTES from './routes.js';
import './App.scss';

import Nav from '../../components/Nav/Nav.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      opportunities: [],
      myOpportunities: [],
      partners: []
    }
  }

  set(obj, cb) {
    this.setState(obj, cb);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <Nav/>
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-10 col-lg-7'>
              <br/><br/>
              <Switch>
                {ROUTES.map((route) => {
                  const C = route.component;
                  route.component = () => {
                    return <C set={this.set.bind(this)} {...this.state}/>
                  };
                  return (<Route exact {...route} />);
                })}
              </Switch>
              <br/><br/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
