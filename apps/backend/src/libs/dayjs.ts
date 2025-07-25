import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import 'dayjs/locale/ja.js';

// 日本語ロケールを設定
dayjs.locale('ja');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;
