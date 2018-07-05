import { fetchHeaders } from '../config/config';

export const getTasksData = () => fetch('api/get_tasks.php', fetchHeaders).then(resp => resp.json());

export const setTaskState = (taskId, state) => fetch(`api/set_task_state.php?taskId=${taskId}&state=${state}`, fetchHeaders).then(resp => resp.json());
