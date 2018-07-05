import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  state = {}

  render () {
    return (
      <div className='wrapper' />);
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
