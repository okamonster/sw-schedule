import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';

// dayjsプラグインを拡張
dayjs.extend(isSameOrAfter);
dayjs.extend(timezone);

// 日本語ロケールを設定
dayjs.locale('ja');

dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;
