import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime);


export const toBeiJingTime = (date: any) => {
  return dayjs(date).tz('Asia/Shanghai', true)
}

export default dayjs;
