import React from 'react';
import './App.css';
import { Container, Row, Col } from "react-bootstrap"
import Navigation from "./components/Navigation"
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import HomePage from "./components/HomePage"
import BackOffice from './components/BackOffice';
import EditBook from "./components/EditBook"


class App extends React.Component {

  state = {
    books: []
  }
  
  render() {
    return (

      <Router>
      <div>
        <Navigation />
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/details/:asin">
            <EditBook />
          </Route>
          <Route path="/backoffice">
            <BackOffice />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
    
    )
  }
}
export default App;
