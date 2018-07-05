import * as types from './constants';

export const getTasksAction = () => ({ type: types.GET_TASKS_DATA_REQUEST });

export const setTaskStateAction = (taskId, state) => ({ type: types.SET_TASK_STATE_REQUEST, taskId, state });
