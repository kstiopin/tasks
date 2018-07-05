import * as consts from './constants';

const initialState = { tasks: [] };

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case consts.GET_TASKS_DATA_SUCCESS:
      return { ...state, tasks: action.data };
    default:
      return state;
  }
}

export default mainReducer;
