import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes/routes'

class App extends Component {
  render() {
    const { history } = this.props;
    return (
      <Router history={ history }>
        { Routes }
      </Router>
    );
  }
}

export default App;
