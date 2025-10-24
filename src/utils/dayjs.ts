import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// 不使用 timezone 插件，直接用 utcOffset
// 北京时间是 UTC+8，即偏移 8 小时 = 480 分钟
export function getBeijingTime() {
  return dayjs().utcOffset(480);
}

