import { call, put, takeEvery } from 'redux-saga/effects';

import * as consts from './constants';
import * as apis from './api';

function* getTasksSaga() {
  try {
    const data = yield call(apis.getTasksData);
    yield put({ type: consts.GET_TASKS_DATA_SUCCESS, data });
  } catch (e) {
    console.log('getTasksSaga error', e.message);
  }
}

function* mainSaga() {
  yield [
    takeEvery(consts.GET_TASKS_DATA_REQUEST, getTasksSaga)
  ];
}

export default mainSaga;
