import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { getTasksAction } from './actions';

const urgencyMarks = ['critical.svg', 'major.svg', 'major.svg', 'neutral.png', 'trivial.svg', 'minor.svg', 'minor.svg'];

class App extends Component {
  state = { hideDone: true }

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  toggleShowDone = () => this.setState(prevState => ({ hideDone: !prevState.hideDone }))

  render () {
    const { tasks } = this.props;
    const { hideDone } = this.state;

    return (<Fragment>
      <div className='controlls'>
        <span onClick={ this.toggleShowDone }>{ hideDone ? 'Show' : 'Hide'} 'Done' tasks</span>
      </div>
      <div className='tasks'>
        { tasks.map(task => (!hideDone || (task.state === 'todo')) && <div key={ task.id } className={ task.state }>
          <img src={ `style/${urgencyMarks[task.urgency - 1]}` } alt={ task.urgency } title={ task.added } />
          <div>{ task.text }</div>
          <em dangerouslySetInnerHTML={ {__html: task.details } } />
        </div>) }
      </div>
    </Fragment>);
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = ({ tasks }) => ({ tasks });

const mapDispatchToProps = dispatch => bindActionCreators({ getTasks: getTasksAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
