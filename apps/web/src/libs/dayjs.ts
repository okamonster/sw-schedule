import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/ja';

// dayjsプラグインを拡張
dayjs.extend(isSameOrAfter);

// 日本語ロケールを設定
dayjs.locale('ja');

export default dayjs;
