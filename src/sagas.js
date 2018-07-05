import { call, put, takeEvery } from 'redux-saga/effects';

import * as consts from './constants';
import * as apis from './api';

function* getTasksSaga() {
  const data = yield call(apis.getTasksData);
  yield put({ type: consts.GET_TASKS_DATA_SUCCESS, data });
}

function* setTaskStateSaga(action) {
  yield call(apis.setTaskState, action.taskId, action.state);
  yield [
    put({ type: consts.SET_TASK_STATE_SUCCESS }),
    put({ type: consts.GET_TASKS_DATA_REQUEST })
  ];
}

function* mainSaga() {
  yield [
    takeEvery(consts.GET_TASKS_DATA_REQUEST, getTasksSaga),
    takeEvery(consts.SET_TASK_STATE_REQUEST, setTaskStateSaga)
  ];
}

export default mainSaga;
