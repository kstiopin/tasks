import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getTasksAction } from './actions';

class App extends Component {
  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  render () {
    const { tasks } = this.props;

    return tasks.map(task => <div key={ task.id }>
      { task.text }
    </div>);
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = dispatch => bindActionCreators({ getTasks: getTasksAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
