import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ja';

// dayjsプラグインを拡張
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
dayjs.extend(timezone);

// 日本語ロケールを設定
dayjs.locale('ja');

// タイムゾーンを設定（環境変数から取得、デフォルトは日本時間）
const timezoneName = process.env.NEXT_PUBLIC_TIMEZONE || 'Asia/Tokyo';
dayjs.tz.setDefault(timezoneName);

export default dayjs;
