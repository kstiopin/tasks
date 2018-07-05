import { fetchHeaders } from '../config/config';

export const getTasksData = () => fetch(`api/get_tasks.php`, fetchHeaders).then(resp => resp.json());
