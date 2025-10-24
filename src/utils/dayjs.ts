import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// 北京时间是 UTC+8，即偏移 8 小时 = 480 分钟
export function getBeijingTime(date?: any) {
  return (date ? dayjs(date) : dayjs()).add(8, 'h');
}

