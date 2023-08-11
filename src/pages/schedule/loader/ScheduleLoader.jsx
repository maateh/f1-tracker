// query
import { getScheduleQuery } from "./query/ScheduleQuery";

export const scheduleLoader = ({ params }) => getScheduleQuery(params)
