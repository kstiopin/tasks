import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// actions
import { getTasksAction, setTaskStateAction } from './actions';
// style
import '../style/style.less';

const urgencyMarks = ['critical.svg', 'major.svg', 'high.svg', 'neutral.png', 'small.svg', 'minor.svg', 'trivial.svg'];
const sortTasksKeys = ['state', 'urgency', 'added'];

class App extends Component {
  state = { hideDone: true }

  componentDidMount() {
    const { getTasks } = this.props;
    getTasks();
  }

  toggleShowDone = () => this.setState(prevState => ({ hideDone: !prevState.hideDone }))

  setTaskState = (taskId, state) => {
    const { setTaskState } = this.props;
    setTaskState(taskId, state);
  }

  handleTasksSort = (task1, task2, sortTasksKey = 0) => (task1[sortTasksKeys[sortTasksKey]] > task2[sortTasksKeys[sortTasksKey]])
    ? 1
    : ((task1[sortTasksKeys[sortTasksKey]] < task2[sortTasksKeys[sortTasksKey]])
      ? -1
      : ((sortTasksKey < sortTasksKeys.length)
        ? this.handleTasksSort(task1, task2, sortTasksKey + 1)
        : 0))

  renderTask = task => (<div key={ task.id } className={ task.state }>
    <img src={ `style/${urgencyMarks[task.urgency - 1]}` } alt={ task.urgency } title={ task.added } />
    <div className='task-body'>
      { task.text }
      { (task.state === 'todo') && <img src='../style/ok.png' alt='Finish' onClick={ () => this.setTaskState(task.id, 'done') } /> }
      { (task.state === 'done') && <img src='../style/enable.png' alt='ReEnable' onClick={ () => this.setTaskState(task.id, 'todo') } /> }
    </div>
    <em dangerouslySetInnerHTML={ { __html: task.details } } />
    { task.children && (task.children.length > 0) && task.children.map(this.renderTask) }
  </div>)

  render () {
    const { tasks } = this.props;
    const { hideDone } = this.state;
    const _tasks = {};
    tasks.forEach(task => {
      const taskParent = parseInt(task.parent);
      const taskId = parseInt(task.id);
      if (taskParent === 0) {
        _tasks[taskId] = { ..._tasks[taskId], ...task };
      } else {
        if (!_tasks.hasOwnProperty(taskParent)) {
          _tasks[taskParent] = { children: [] };
        } else if (!_tasks[taskParent].hasOwnProperty('children')) {
          _tasks[taskParent].children = [task];
        } else {
          _tasks[taskParent].children.push(task);
        }
      }
    });

    return (<Fragment>
      <div className='controlls'>
        <span onClick={ this.toggleShowDone }>{ hideDone ? 'Show' : 'Hide'} 'Done' tasks</span>
      </div>
      <div className='tasks'>
        { Object.values(_tasks).sort(this.handleTasksSort).map(task => (!hideDone || (task.state === 'todo')) && this.renderTask(task)) }
      </div>
    </Fragment>);
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  getTasks: PropTypes.func.isRequired
};

const mapStateToProps = ({ tasks }) => ({ tasks });
const mapDispatchToProps = dispatch => bindActionCreators({
  getTasks: getTasksAction,
  setTaskState: setTaskStateAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
