import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

// 北京时间是 UTC+8，即偏移 8 小时 = 480 分钟
export function getBeijingTime(date?: any) {
  if (date) return dayjs(date).utcOffset(480);
  return dayjs().utcOffset(480);
}

